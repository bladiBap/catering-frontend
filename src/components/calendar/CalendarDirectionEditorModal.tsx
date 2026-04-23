'use client'

import { useEffect, useMemo, useState } from 'react'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

import { DireccionDto } from '@/models/calendar/calendario/Calendario'

interface CalendarDirectionEditorModalProps {
    isOpen: boolean
    direction: DireccionDto
    onClose: () => void
    onSave: (direction: DireccionDto) => Promise<void>
    onToggleDelivery: (isActive: boolean) => Promise<void>
    allowDeliveryToggle?: boolean
    title?: string
}

export function CalendarDirectionEditorModal({
    isOpen,
    direction,
    onClose,
    onSave,
    onToggleDelivery,
    allowDeliveryToggle = true,
    title = 'Editar dirección',
}: CalendarDirectionEditorModalProps) {
    const [fecha, setFecha] = useState(direction.Fecha)
    const [direccion, setDireccion] = useState(direction.Direccion)
    const [referencias, setReferencias] = useState(direction.Referencias)
    const [latitud, setLatitud] = useState(String(direction.Latitud))
    const [longitud, setLongitud] = useState(String(direction.Longitud))
    const [esEntregaActiva, setEsEntregaActiva] = useState(direction.EsEntregaActiva)
    const [isSaving, setIsSaving] = useState(false)
    const [isTogglingDelivery, setIsTogglingDelivery] = useState(false)
    const [saveError, setSaveError] = useState('')
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
    const { isLoaded } = useJsApiLoader({
        id: 'calendar-direction-editor-map',
        googleMapsApiKey,
    })

    useEffect(() => {
        if (!isOpen) {
            return
        }

        setFecha(direction.Fecha)
        setDireccion(direction.Direccion)
        setReferencias(direction.Referencias)
        setLatitud(String(direction.Latitud))
        setLongitud(String(direction.Longitud))
        setEsEntregaActiva(direction.EsEntregaActiva)
        setSaveError('')
        setIsSaving(false)
        setIsTogglingDelivery(false)
    }, [direction, isOpen])

    const mapPosition = useMemo(() => {
        const latitude = Number(latitud)
        const longitude = Number(longitud)

        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
            return { lat: latitude, lng: longitude }
        }

        return null
    }, [latitud, longitud])

    const fallbackCenter = useMemo(() => ({ lat: -16.5, lng: -68.15 }), [])

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const nextLatitude = event.latLng?.lat()
        const nextLongitude = event.latLng?.lng()

        if (nextLatitude == null || nextLongitude == null) {
            return
        }

        setLatitud(nextLatitude.toFixed(6))
        setLongitud(nextLongitude.toFixed(6))
    }

    const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
        const nextLatitude = event.latLng?.lat()
        const nextLongitude = event.latLng?.lng()

        if (nextLatitude == null || nextLongitude == null) {
            return
        }

        setLatitud(nextLatitude.toFixed(6))
        setLongitud(nextLongitude.toFixed(6))
    }

    if (!isOpen) {
        return null
    }

    const handleSave = async () => {
        const nextLatitud = Number(latitud)
        const nextLongitud = Number(longitud)

        setSaveError('')
        setIsSaving(true)

        try {
            await onSave({
                ...direction,
                Fecha: fecha,
                Direccion: direccion.trim(),
                Referencias: referencias.trim(),
                Latitud: Number.isFinite(nextLatitud) ? nextLatitud : direction.Latitud,
                Longitud: Number.isFinite(nextLongitud) ? nextLongitud : direction.Longitud,
                EsEntregaActiva: esEntregaActiva,
            })
        } catch {
            setSaveError('No se pudo guardar la direccion. Intenta nuevamente.')
        } finally {
            setIsSaving(false)
        }
    }

    const handleToggleDelivery = async (nextValue: boolean) => {
        if (nextValue === esEntregaActiva) {
            return
        }

        setSaveError('')
        setIsTogglingDelivery(true)

        try {
            await onToggleDelivery(nextValue)
            setEsEntregaActiva(nextValue)
        } catch {
            setSaveError('No se pudo actualizar el estado de entrega. Intenta nuevamente.')
        } finally {
            setIsTogglingDelivery(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6">
            <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
                <div className="border-b border-slate-200 px-6 py-4">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                            <p className="mt-1 text-sm text-slate-500">Ajusta la ubicación y define si se entrega ese día.</p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>

                <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="h-full min-h-80 border-b border-slate-200 lg:border-b-0 lg:border-r">
                        {googleMapsApiKey ? (
                            <div className="h-full min-h-80">
                                {isLoaded ? (
                                    <GoogleMap
                                        mapContainerClassName="h-full min-h-80 w-full"
                                        center={mapPosition ?? fallbackCenter}
                                        zoom={16}
                                        onClick={handleMapClick}
                                        options={{ streetViewControl: false, mapTypeControl: false }}
                                    >
                                        {mapPosition && (
                                            <MarkerF
                                                position={mapPosition}
                                                draggable
                                                onDragEnd={handleMarkerDragEnd}
                                            />
                                        )}
                                    </GoogleMap>
                                ) : (
                                    <div className="flex h-full min-h-80 items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
                                        Cargando mapa interactivo...
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex min-h-80 items-center justify-center bg-slate-50 px-6 text-center text-sm text-slate-500">
                                Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para mostrar el mapa.
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 overflow-y-auto p-6">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Fecha</label>
                            <input
                                type="date"
                                value={fecha}
                                onChange={(event) => setFecha(event.target.value)}
                                disabled={allowDeliveryToggle}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500 disabled:bg-slate-100 disabled:text-slate-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Dirección</label>
                            <input
                                value={direccion}
                                onChange={(event) => setDireccion(event.target.value)}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Referencias</label>
                            <textarea
                                value={referencias}
                                onChange={(event) => setReferencias(event.target.value)}
                                rows={4}
                                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Latitud</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={latitud}
                                    onChange={(event) => setLatitud(event.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-700">Longitud</label>
                                <input
                                    type="number"
                                    step="any"
                                    value={longitud}
                                    onChange={(event) => setLongitud(event.target.value)}
                                    className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-slate-500"
                                />
                            </div>
                        </div>

                        {allowDeliveryToggle ? (
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <p className="text-sm font-medium text-slate-700">Entrega del día</p>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleToggleDelivery(true)}
                                        disabled={isSaving || isTogglingDelivery}
                                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                            esEntregaActiva
                                                ? 'bg-blue-600 text-white'
                                                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        Entregar este día
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleDelivery(false)}
                                        disabled={isSaving || isTogglingDelivery}
                                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                            !esEntregaActiva
                                                ? 'bg-rose-600 text-white'
                                                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        No entregar este día
                                    </button>
                                </div>
                                <p className="mt-3 text-xs text-slate-500">
                                    Haz click en el mapa o arrastra el marcador para actualizar latitud y longitud.
                                </p>
                            </div>
                        ) : (
                            <p className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
                                Haz click en el mapa o arrastra el marcador para actualizar latitud y longitud.
                            </p>
                        )}

                        <div className="mt-auto flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
                            {saveError && (
                                <p className="w-full text-sm text-red-600">{saveError}</p>
                            )}
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSaving || isTogglingDelivery}
                                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isSaving || isTogglingDelivery}
                                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}