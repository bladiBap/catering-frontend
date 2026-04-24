import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { DeliveryZoneCard } from '@/components/delivery/DeliveryZoneCard'
import { DeliveryZone } from '@/models/delivery/zones/DeliveryZone'

interface DeliveryZoneListScreenProps {
    zones: DeliveryZone[]
}

export function DeliveryZoneListScreen({ zones }: DeliveryZoneListScreenProps) {
    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Zonas de Delivery" />
                <Link
                    href="/delivery/zone/create"
                    className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                    Crear Zona
                </Link>
            </div>

            <GridContainer emptyMessage="No hay zonas para mostrar">
                {zones.map((zone) => (
                    <DeliveryZoneCard key={zone.id} zone={zone} />
                ))}
            </GridContainer>
        </>
    )
}
