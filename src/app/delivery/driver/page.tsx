import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { Driver } from '@/models/delivery/drivers/Driver'
import { DriverService } from '@/services/delivery/DriverService'
import { DriverListScreen } from '@/screens/delivery/driver/DriverListScreen'

export default async function DriverListPage() {
    const token = (await cookies()).get('auth_token')?.value ?? ''

    let drivers: Driver[] = []
    try {
        const response = await DriverService.getAll(token, {
            page: 1,
            pageSize: 100,
        })

        const value = response.value as unknown
        if (Array.isArray(value)) {
            drivers = value as Driver[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            drivers = ((value as { items?: Driver[] }).items ?? [])
        }
    } catch {
        drivers = []
    }

    return (
        <ContainerPage>
            <DriverListScreen drivers={drivers} />
        </ContainerPage>
    )
}
