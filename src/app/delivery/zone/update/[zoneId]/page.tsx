import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { Driver } from '@/models/delivery/drivers/Driver'
import { DriverService } from '@/services/delivery/DriverService'
import { DeliveryZoneService } from '@/services/delivery/DeliveryZoneService'
import { DeliveryZoneFormScreen } from '@/screens/delivery/zone/DeliveryZoneFormScreen'

interface UpdateDeliveryZonePageProps {
    params: Promise<{ zoneId: string }>
}

export default async function UpdateDeliveryZonePage({ params }: UpdateDeliveryZonePageProps) {
    const { zoneId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    let drivers: Driver[] = []
    try {
        const driverResponse = await DriverService.getAll(token, { page: 1, pageSize: 100 })
        const value = driverResponse.value as unknown

        if (Array.isArray(value)) {
            drivers = value as Driver[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            drivers = ((value as { items?: Driver[] }).items ?? [])
        }
    } catch {
        drivers = []
    }

    try {
        const zoneResponse = await DeliveryZoneService.getById(token, zoneId)
        if (!zoneResponse.isSuccess || !zoneResponse.value) {
            return <ContainerPage>No se encontro la zona solicitada.</ContainerPage>
        }

        return (
            <ContainerPage>
                <DeliveryZoneFormScreen drivers={drivers} zone={zoneResponse.value} />
            </ContainerPage>
        )
    } catch {
        return <ContainerPage>No se pudo obtener la zona solicitada.</ContainerPage>
    }
}
