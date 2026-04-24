'use client'

import Link from 'next/link'
import { GoogleMap, MarkerF, PolygonF, useJsApiLoader } from '@react-google-maps/api'

import { DeliveryZoneDetail } from '@/models/delivery/zones/DeliveryZone'

interface DeliveryZoneDetailScreenProps {
    zone: DeliveryZoneDetail
}

export function DeliveryZoneDetailScreen({ zone }: DeliveryZoneDetailScreenProps) {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
    const { isLoaded } = useJsApiLoader({
        id: 'delivery-zone-detail-map',
        googleMapsApiKey,
    })

    const mapPoints = zone.boundaries.map((point) => ({ lat: point.latitude, lng: point.longitude }))
    const center = mapPoints[0] ?? { lat: -17.7833, lng: -63.1821 }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm tracking-wide text-slate-500">Detalle de zona</p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">{zone.name}</h1>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/delivery/zone"
                        className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                    >
                        Volver
                    </Link>
                    <Link
                        href={`/delivery/zone/update/${zone.id}`}
                        className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        Editar
                    </Link>
                </div>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-slate-400">ID</p>
                        <p className="mt-1 text-slate-800 break-all">{zone.id}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Codigo</p>
                        <p className="mt-1 text-slate-800">{zone.code}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Nombre</p>
                        <p className="mt-1 text-slate-800">{zone.name}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Driver ID</p>
                        <p className="mt-1 text-slate-800 break-all">{zone.driverId}</p>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Puntos de la zona</h2>
                <p className="mt-1 text-sm text-slate-500">Total de puntos: {zone.boundaries.length}</p>

                <div className="mt-4 h-80 overflow-hidden rounded-xl border border-slate-200">
                    {googleMapsApiKey ? (
                        isLoaded ? (
                            <GoogleMap
                                mapContainerClassName="h-full w-full"
                                center={center}
                                zoom={13}
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
                            Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para visualizar el mapa.
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
