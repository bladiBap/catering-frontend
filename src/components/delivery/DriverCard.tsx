import Link from 'next/link'

import { Driver } from '@/models/delivery/drivers/Driver'

interface DriverCardProps {
    driver: Driver
}

export function DriverCard({ driver }: DriverCardProps) {
    return (
        <Link
            href={`/delivery/driver/${driver.id}`}
            className="w-full rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-slate-900 truncate">{driver.fullName}</h2>
                <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        driver.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {driver.isActive ? 'Activo' : 'Inactivo'}
                </span>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p>
                    <span className="text-slate-400">ID:</span> {driver.id}
                </p>
                <p className="mt-2">
                    <span className="text-slate-400">Estado:</span> {driver.status}
                </p>
            </div>
        </Link>
    )
}
