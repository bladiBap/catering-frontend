import Link from 'next/link'

import { DeliveryZone } from '@/models/delivery/zones/DeliveryZone'

interface DeliveryZoneCardProps {
    zone: DeliveryZone
}

export function DeliveryZoneCard({ zone }: DeliveryZoneCardProps) {
    return (
        <Link
            href={`/delivery/zone/${zone.id}`}
            className="w-full rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
        >
            <h2 className="text-lg font-semibold text-slate-900">{zone.name}</h2>
            <p className="mt-1 text-sm text-slate-500">Codigo: {zone.code}</p>
            <p className="mt-4 text-xs text-slate-400 break-all">ID: {zone.id}</p>
        </Link>
    )
}
