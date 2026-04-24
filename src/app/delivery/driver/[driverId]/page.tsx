import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { DriverService } from '@/services/delivery/DriverService'
import { DriverDetailScreen } from '@/screens/delivery/driver/DriverDetailScreen'

interface DriverByIdPageProps {
    params: Promise<{ driverId: string }>
}

export default async function DriverByIdPage({ params }: DriverByIdPageProps) {
    const { driverId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    try {
        const response = await DriverService.getById(token, driverId)
        if (!response.isSuccess || !response.value) {
            return <ContainerPage>No se encontro el driver solicitado.</ContainerPage>
        }

        return (
            <ContainerPage>
                <DriverDetailScreen driver={response.value} />
            </ContainerPage>
        )
    } catch {
        return <ContainerPage>No se pudo obtener el driver solicitado.</ContainerPage>
    }
}
