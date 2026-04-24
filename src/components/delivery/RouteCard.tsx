import Link from 'next/link'

import { DeliveryRoute } from '@/models/delivery/routes/Route'

interface RouteCardProps {
    route: DeliveryRoute
}

const DATE_LOCALE = 'es-BO'

function formatDate(date: string) {
    const value = new Date(date)
    if (Number.isNaN(value.getTime())) {
        return '-'
    }

    return value.toLocaleString(DATE_LOCALE)
}

export function RouteCard({ route }: RouteCardProps) {
    return (
        <Link href={`/delivery/route/${route.id}`} className="w-full rounded-xl border border-slate-200 bg-white p-5 block transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Ruta #{route.id.slice(0, 8)}</h2>

            <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600 space-y-2">
                <p>
                    <span className="text-slate-400">Estado:</span> {route.status}
                </p>
                <p>
                    <span className="text-slate-400">Inicio:</span> {formatDate(route.startedAt)}
                </p>
                <p>
                    <span className="text-slate-400">Finalizacion:</span> {formatDate(route.completedAt)}
                </p>
                <p>
                    <span className="text-slate-400">Creado:</span> {formatDate(route.createdAt)}
                </p>
                <p className="pt-1 text-xs text-slate-400 break-all">ID: {route.id}</p>
            </div>
        </Link>
    )
}