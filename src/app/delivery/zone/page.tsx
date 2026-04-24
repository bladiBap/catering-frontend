import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { DeliveryZone } from '@/models/delivery/zones/DeliveryZone'
import { DeliveryZoneService } from '@/services/delivery/DeliveryZoneService'
import { DeliveryZoneListScreen } from '@/screens/delivery/zone/DeliveryZoneListScreen'

export default async function DeliveryZoneListPage() {
    const token = (await cookies()).get('auth_token')?.value ?? ''

    let zones: DeliveryZone[] = []
    try {
        const response = await DeliveryZoneService.getAll(token, {
            page: 1,
            pageSize: 100,
        })

        const value = response.value as unknown
        if (Array.isArray(value)) {
            zones = value as DeliveryZone[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            zones = ((value as { items?: DeliveryZone[] }).items ?? [])
        }
    } catch {
        zones = []
    }

    return (
        <ContainerPage>
            <DeliveryZoneListScreen zones={zones} />
        </ContainerPage>
    )
}
