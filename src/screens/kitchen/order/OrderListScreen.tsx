import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { OrderCard } from '@/components/kitchen/OrderCard'
import { OrderDTO, StatusOrder } from '@/models/kitchen/orders/Order'

const TODAY = new Date().toISOString().slice(0, 10)

export const MOCK_ORDERS: OrderDTO[] = [
    {
        id: '32f642dc-6097-4c31-a8c9-49089ae35f8f',
        dateOrdered: `${TODAY}T08:00:00.000Z`,
        dateCreatedOn: `${TODAY}T07:45:00.000Z`,
        status: StatusOrder.CREATED,
        orderItems: [],
    },
    {
        id: 'ca3405a8-57b6-4ac8-abeb-2f3e357cd37a',
        dateOrdered: `${TODAY}T12:30:00.000Z`,
        dateCreatedOn: `${TODAY}T12:10:00.000Z`,
        status: StatusOrder.COMPLETED,
        orderItems: [],
    },
    {
        id: '6f6f1967-3c16-4f16-a174-cf4f3449f412',
        dateOrdered: '2026-04-10T08:00:00.000Z',
        dateCreatedOn: '2026-04-10T07:50:00.000Z',
        status: StatusOrder.CREATED,
        orderItems: [],
    },
]

interface OrderListScreenProps {
    orders: OrderDTO[]
}

export function OrderListScreen({ orders }: OrderListScreenProps) {
    const ordersToday = orders.filter((order) => order.dateOrdered.startsWith(TODAY))

    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Ordenes" />
                <Link
                    href="/kitchen/order/create"
                    className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                    Crear Orden
                </Link>
            </div>

            <GridContainer emptyMessage="No hay ordenes para mostrar hoy">
                {ordersToday.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </GridContainer>
        </>
    )
}
