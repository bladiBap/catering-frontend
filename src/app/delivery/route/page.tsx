import { cookies } from 'next/headers'

import { ContainerPage } from '@/components/page/ContainerPage'
import { DeliveryRoute } from '@/models/delivery/routes/Route'
import { RouteListScreen } from '@/screens/delivery/route/RouteListScreen'
import { RouteService } from '@/services/delivery/RouteService'

function extractRoutes(response: unknown): DeliveryRoute[] {
    if (Array.isArray(response)) {
        return response as DeliveryRoute[]
    }

    if (!response || typeof response !== 'object') {
        return []
    }

    if ('value' in response) {
        const value = (response as { value?: unknown }).value

        if (Array.isArray(value)) {
            return value as DeliveryRoute[]
        }

        if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            return ((value as { items?: DeliveryRoute[] }).items ?? [])
        }
    }

    if ('items' in response) {
        return ((response as { items?: DeliveryRoute[] }).items ?? [])
    }

    return []
}

export default async function RouteListPage() {
    const token = (await cookies()).get('auth_token')?.value ?? ''

    let routes: DeliveryRoute[] = []
    try {
        const response = await RouteService.getAll(token, {
            page: 1,
            pageSize: 100,
        })

        routes = extractRoutes(response)
    } catch {
        routes = []
    }

    return (
        <ContainerPage>
            <RouteListScreen routes={routes} />
        </ContainerPage>
    )
}