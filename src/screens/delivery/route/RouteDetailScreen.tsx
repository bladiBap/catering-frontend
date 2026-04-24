"use client"

import Link from 'next/link'
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api'

import { DeliveryRouteDetail } from '@/models/delivery/routes/Route'

interface RouteDetailScreenProps {
    route: DeliveryRouteDetail
}

const DATE_LOCALE = 'es-BO'

function formatDate(date: string) {
    const value = new Date(date)
    if (Number.isNaN(value.getTime())) {
        return '-'
    }

    return value.toLocaleString(DATE_LOCALE)
}

function formatLocation(latitude: number, longitude: number) {
    return `${latitude}, ${longitude}`
}

export function RouteDetailScreen({ route }: RouteDetailScreenProps) {
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''
    const { isLoaded } = useJsApiLoader({
        id: 'route-detail-map',
        googleMapsApiKey,
    })

    const originPoint = {
        lat: route.originLocation.latitude,
        lng: route.originLocation.longitude,
    }
    const stopPoints = route.stops.map((stop) => ({
        id: stop.id,
        sequence: stop.deliverySequence,
        status: stop.status,
        lat: stop.deliveryLocation.latitude,
        lng: stop.deliveryLocation.longitude,
    }))
    const path = [originPoint, ...stopPoints.map((point) => ({ lat: point.lat, lng: point.lng }))]

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm tracking-wide text-slate-500">Detalle de ruta</p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">Ruta #{route.id.slice(0, 8)}</h1>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/delivery/route"
                        className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                    >
                        Volver
                    </Link>
                </div>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-slate-400">ID</p>
                        <p className="mt-1 text-slate-800 break-all">{route.id}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Batch ID</p>
                        <p className="mt-1 text-slate-800 break-all">{route.batchId}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Delivery Zone ID</p>
                        <p className="mt-1 text-slate-800 break-all">{route.deliveryZoneId}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Driver ID</p>
                        <p className="mt-1 text-slate-800 break-all">{route.driverId}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Estado</p>
                        <p className="mt-1 text-slate-800">{route.status}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Inicio</p>
                        <p className="mt-1 text-slate-800">{formatDate(route.startedAt)}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Finalizacion</p>
                        <p className="mt-1 text-slate-800">{formatDate(route.completedAt)}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Origen</p>
                        <p className="mt-1 text-slate-800">
                            {formatLocation(route.originLocation.latitude, route.originLocation.longitude)}
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Mapa de la ruta</h2>
                <p className="mt-1 text-sm text-slate-500">Origen y paradas en orden de entrega.</p>

                <div className="mt-4 h-96 overflow-hidden rounded-xl border border-slate-200">
                    {googleMapsApiKey ? (
                        isLoaded ? (
                            <GoogleMap
                                mapContainerClassName="h-full w-full"
                                center={originPoint}
                                zoom={13}
                                options={{ streetViewControl: false, mapTypeControl: false }}
                            >
                                <MarkerF position={originPoint} label="O" title="Punto de partida" />

                                {stopPoints.map((stop, index) => (
                                    <MarkerF
                                        key={stop.id}
                                        position={{ lat: stop.lat, lng: stop.lng }}
                                        label={`${stop.sequence || index + 1}`}
                                        title={`Parada ${stop.sequence || index + 1}`}
                                    />
                                ))}

                                {path.length > 1 && (
                                    <PolylineF
                                        path={path}
                                        options={{
                                            strokeColor: '#2563eb',
                                            strokeOpacity: 0.9,
                                            strokeWeight: 3,
                                        }}
                                    />
                                )}
                            </GoogleMap>
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-slate-500">Cargando mapa...</div>
                        )
                    ) : (
                        <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-500">
                            Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para visualizar el mapa de la ruta.
                        </div>
                    )}
                </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Paradas</h2>
                <p className="mt-1 text-sm text-slate-500">Total de paradas: {route.stops.length}</p>

                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Secuencia</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Estado</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Ubicacion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {route.stops.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-sm text-slate-500">
                                        No hay paradas registradas.
                                    </td>
                                </tr>
                            ) : (
                                route.stops.map((stop) => (
                                    <tr key={stop.id}>
                                        <td className="px-4 py-3 text-sm text-slate-700 break-all">{stop.id}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{stop.deliverySequence}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{stop.status}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">
                                            {formatLocation(stop.deliveryLocation.latitude, stop.deliveryLocation.longitude)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}