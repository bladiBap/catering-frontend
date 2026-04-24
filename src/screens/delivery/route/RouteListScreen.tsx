import { TitlePage } from '@/components/page/TitlePage'
import { RouteCard } from '@/components/delivery/RouteCard'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { DeliveryRoute } from '@/models/delivery/routes/Route'

interface RouteListScreenProps {
    routes: DeliveryRoute[]
}

export function RouteListScreen({ routes }: RouteListScreenProps) {
    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Rutas" />
            </div>

            <GridContainer emptyMessage="No hay rutas para mostrar">
                {routes.map((route) => (
                    <RouteCard key={route.id} route={route} />
                ))}
            </GridContainer>
        </>
    )
}