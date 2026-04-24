'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GoogleMap, MarkerF, PolygonF, useJsApiLoader } from '@react-google-maps/api'
import { Button, Form, Select, SelectItem } from '@heroui/react'
import { Input } from '@heroui/input'

import { TitlePage } from '@/components/page/TitlePage'
import { Driver } from '@/models/delivery/drivers/Driver'
import {
    CreateDeliveryZoneRequest,
    DeliveryZoneBoundaryPoint,
    DeliveryZoneDetail,
    UpdateDeliveryZoneRequest,
} from '@/models/delivery/zones/DeliveryZone'
import { DeliveryZoneService } from '@/services/delivery/DeliveryZoneService'

interface DeliveryZoneFormScreenProps {
    drivers: Driver[]
    zone?: DeliveryZoneDetail
}

export function DeliveryZoneFormScreen({ drivers, zone }: DeliveryZoneFormScreenProps) {
    const router = useRouter()
    const [driverId, setDriverId] = useState(zone?.driverId ?? '')
    const [code, setCode] = useState(zone?.code ?? '')
    const [name, setName] = useState(zone?.name ?? '')
    const [boundaries, setBoundaries] = useState<DeliveryZoneBoundaryPoint[]>(zone?.boundaries ?? [])
    const [latitudeInput, setLatitudeInput] = useState('')
    const [longitudeInput, setLongitudeInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
    const { isLoaded } = useJsApiLoader({
        id: 'delivery-zone-form-map',
        googleMapsApiKey,
    })

    const mapPoints = boundaries.map((point) => ({ lat: point.latitude, lng: point.longitude }))
    const mapCenter = useMemo(() => mapPoints[0] ?? { lat: -17.7833, lng: -63.1821 }, [mapPoints])
    const isEditMode = Boolean(zone)

    const addBoundaryPoint = (point: DeliveryZoneBoundaryPoint) => {
        setBoundaries((prev) => [...prev, point])
    }

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const latitude = event.latLng?.lat()
        const longitude = event.latLng?.lng()

        if (latitude == null || longitude == null) {
            return
        }

        addBoundaryPoint({
            latitude: Number(latitude.toFixed(6)),
            longitude: Number(longitude.toFixed(6)),
        })
    }

    const handleAddManualPoint = () => {
        const latitude = Number(latitudeInput)
        const longitude = Number(longitudeInput)

        if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
            setError('Ingresa latitud y longitud validas para agregar un punto.')
            return
        }

        setError('')
        addBoundaryPoint({ latitude, longitude })
        setLatitudeInput('')
        setLongitudeInput('')
    }

    const removeBoundaryPoint = (indexToRemove: number) => {
        setBoundaries((prev) => prev.filter((_, index) => index !== indexToRemove))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setError('')

        if (!driverId) {
            setError('Debes seleccionar un driver.')
            return
        }

        if (boundaries.length < 3) {
            setError('Debes agregar al menos 3 puntos para definir la zona.')
            return
        }

        setLoading(true)

        try {
            if (isEditMode && zone) {
                const payload: UpdateDeliveryZoneRequest = {
                    driver_id: driverId,
                    code,
                    name,
                    boundaries,
                }

                const response = await DeliveryZoneService.update('', zone.id, payload)
                if (!response.isSuccess) {
                    setError(response.message || 'No se pudo actualizar la zona de delivery.')
                    return
                }

                router.push(`/delivery/zone/${zone.id}`)
                return
            }

            const payload: CreateDeliveryZoneRequest = {
                driver_id: driverId,
                code,
                name,
                boundaries,
            }

            const response = await DeliveryZoneService.create('', payload)
            if (!response.isSuccess) {
                setError(response.message || 'No se pudo crear la zona de delivery.')
                return
            }

            router.push('/delivery/zone')
        } catch {
            setError('No se pudo guardar la zona de delivery. Intenta nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <TitlePage title={isEditMode ? 'Actualizar Zona de Delivery' : 'Crear Zona de Delivery'} />

            <Form className="grid grid-cols-1 gap-6 lg:grid-cols-2" onSubmit={handleSubmit}>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-sm font-medium text-slate-700">Mapa de puntos</p>
                    <p className="mt-1 text-xs text-slate-500">Haz click en el mapa para agregar puntos. Minimo 3 puntos.</p>

                    <div className="mt-3 h-130 overflow-hidden rounded-xl border border-slate-200">
                        {googleMapsApiKey ? (
                            isLoaded ? (
                                <GoogleMap
                                    mapContainerClassName="h-full w-full"
                                    center={mapCenter}
                                    zoom={13}
                                    onClick={handleMapClick}
                                    options={{ streetViewControl: false, mapTypeControl: false }}
                                >
                                    {mapPoints.map((point, index) => (
                                        <MarkerF key={`${point.lat}-${point.lng}-${index}`} position={point} label={`${index + 1}`} />
                                    ))}
                                    {mapPoints.length >= 3 && (
                                        <PolygonF
                                            path={mapPoints}
                                            options={{
                                                strokeColor: '#2563eb',
                                                fillColor: '#2563eb',
                                                fillOpacity: 0.15,
                                                strokeWeight: 2,
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-slate-500">Cargando mapa...</div>
                            )
                        ) : (
                            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-500">
                                Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para visualizar y capturar puntos en el mapa.
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Select
                            isRequired
                            label="Driver"
                            selectedKeys={driverId ? [driverId] : []}
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys as Set<string>)[0] ?? ''
                                setDriverId(String(selected))
                            }}
                            placeholder="Selecciona un driver"
                            className="md:col-span-2"
                        >
                            {drivers.map((driver) => (
                                <SelectItem key={driver.id}>{driver.fullName}</SelectItem>
                            ))}
                        </Select>

                        <Input
                            isRequired
                            label="Codigo"
                            value={code}
                            onValueChange={setCode}
                            placeholder="ABC-123"
                        />

                        <Input
                            isRequired
                            label="Nombre"
                            value={name}
                            onValueChange={setName}
                            placeholder="Zona A"
                        />
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-medium text-slate-700">Agregar punto manualmente</p>
                        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_auto]">
                            <Input
                                label="Latitud"
                                type="number"
                                value={latitudeInput}
                                onValueChange={setLatitudeInput}
                                placeholder="-17.771380"
                            />
                            <Input
                                label="Longitud"
                                type="number"
                                value={longitudeInput}
                                onValueChange={setLongitudeInput}
                                placeholder="-63.187594"
                            />
                            <div className="flex items-end">
                                <Button type="button" variant="flat" color="secondary" onPress={handleAddManualPoint}>
                                    Agregar punto
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                        <p className="text-sm font-medium text-slate-700">Puntos registrados ({boundaries.length})</p>
                        <div className="mt-3 max-h-56 space-y-2 overflow-y-auto pr-1">
                            {boundaries.length === 0 ? (
                                <p className="text-sm text-slate-500">Aun no agregaste puntos.</p>
                            ) : (
                                boundaries.map((point, index) => (
                                    <div key={`${point.latitude}-${point.longitude}-${index}`} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                                        <span>
                                            Punto {index + 1}: {point.latitude}, {point.longitude}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeBoundaryPoint(index)}
                                            className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
                                        >
                                            Quitar
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <Button type="submit" variant="flat" color="primary" className="w-64" isLoading={loading}>
                        {isEditMode ? 'Actualizar Zona' : 'Crear Zona'}
                    </Button>
                </div>
            </Form>
        </>
    )
}
