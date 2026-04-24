import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { DeliveryRouteDetail } from '@/models/delivery/routes/Route'
import { RouteDetailScreen } from '@/screens/delivery/route/RouteDetailScreen'
import { RouteService } from '@/services/delivery/RouteService'

interface RouteByIdPageProps {
    params: Promise<{ routeId: string }>
}

function extractRouteDetail(response: unknown): DeliveryRouteDetail | null {
    if (!response || typeof response !== 'object') {
        return null
    }

    if ('value' in response) {
        const value = (response as { value?: unknown }).value
        if (value && typeof value === 'object') {
            return value as DeliveryRouteDetail
        }

        return null
    }

    return response as DeliveryRouteDetail
}

export default async function RouteByIdPage({ params }: RouteByIdPageProps) {
    const { routeId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    try {
        const response = await RouteService.getById(token, routeId)
        const route = extractRouteDetail(response)

        if (!route) {
            return <ContainerPage>No se encontro la ruta solicitada.</ContainerPage>
        }

        return (
            <ContainerPage>
                <RouteDetailScreen route={route} />
            </ContainerPage>
        )
    } catch {
        return <ContainerPage>No se pudo obtener la ruta solicitada.</ContainerPage>
    }
}