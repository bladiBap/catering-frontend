import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { DeliveryZoneService } from '@/services/delivery/DeliveryZoneService'
import { DeliveryZoneDetailScreen } from '@/screens/delivery/zone/DeliveryZoneDetailScreen'

interface DeliveryZoneByIdPageProps {
    params: Promise<{ zoneId: string }>
}

export default async function DeliveryZoneByIdPage({ params }: DeliveryZoneByIdPageProps) {
    const { zoneId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    try {
        const response = await DeliveryZoneService.getById(token, zoneId)
        if (!response.isSuccess || !response.value) {
            return <ContainerPage>No se encontro la zona solicitada.</ContainerPage>
        }

        return (
            <ContainerPage>
                <DeliveryZoneDetailScreen zone={response.value} />
            </ContainerPage>
        )
    } catch {
        return <ContainerPage>No se pudo obtener la zona solicitada.</ContainerPage>
    }
}
