import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { DriverCard } from '@/components/delivery/DriverCard'
import { Driver } from '@/models/delivery/drivers/Driver'

interface DriverListScreenProps {
    drivers: Driver[]
}

export function DriverListScreen({ drivers }: DriverListScreenProps) {
    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Drivers" />
                <Link
                    href="/delivery/driver/create"
                    className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                    Crear Driver
                </Link>
            </div>

            <GridContainer emptyMessage="No hay drivers para mostrar">
                {drivers.map((driver) => (
                    <DriverCard key={driver.id} driver={driver} />
                ))}
            </GridContainer>
        </>
    )
}
