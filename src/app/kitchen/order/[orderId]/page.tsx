import { ContainerPage } from '@/components/page/ContainerPage'
import { OrderDetailScreen } from '@/screens/kitchen/order/OrderDetailScreen'
import { OrderDTO, StatusOrder, StatusOrderItem } from '@/models/kitchen/orders/Order'
import { OrderService } from '@/services/kitchen/OrderService'

interface OrderByIdPageProps {
    params: Promise<{ orderId: string }>
}

const MOCK_ORDER_DETAILS: OrderDTO[] = [
    {
        id: '32f642dc-6097-4c31-a8c9-49089ae35f8f',
        dateOrdered: '2026-04-18T08:00:00.000Z',
        dateCreatedOn: '2026-04-18T07:45:00.000Z',
        status: StatusOrder.CREATED,
        orderItems: [
            {
                id: 'a22d2f08-8bf7-497f-bb6e-c5cdf8ff73f3',
                quantity: 2,
                quantityPrepared: 0,
                status: StatusOrderItem.CREATED,
                recipe: {
                    id: 'aaf72c2c-18f4-4fd5-8e47-90d67d5abf37',
                    name: 'Avena con frutas',
                    instructions: 'Servir en bowl y agregar fruta fresca picada.',
                    ingredients: [
                        {
                            id: '57d2c4c8-50d7-4ef3-98fe-6543687a6c6d',
                            name: 'Avena',
                            measurementUnit: {
                                id: 'd1707f56-7b4c-4e4a-a4cb-7f4dc66358fc',
                                name: 'Gramo',
                                simbol: 'g',
                            },
                        },
                        {
                            id: 'a44cc0a3-bb2f-4bf3-9927-6f6fb2527282',
                            name: 'Banano',
                            measurementUnit: {
                                id: '14b85e8e-85be-4dc6-ae85-f7045f88eb33',
                                name: 'Unidad',
                                simbol: 'u',
                            },
                        },
                    ],
                },
            },
            {
                id: 'b8c9e5d1-3f2a-4c6e-9f8b-1a2d3e4f5g6h',
                quantity: 1,
                quantityPrepared: 1,
                status: StatusOrderItem.COMPLETED,
                recipe: {
                    id: 'c1d2e3f4-5678-4a9b-8c7d-0e1f2a3b4c5d',
                    name: 'Ensalada de pollo',
                    instructions: 'Mezclar todos los ingredientes y servir frío.',
                    ingredients: [
                        {
                            id: 'd4e5f6a7-8b9c-4d0e-9f1a-2b3c4d5e6f7g',
                            name: 'Pechuga de pollo',
                            measurementUnit: {
                                id: 'e8f9a0b1-2c3d-4e5f-6g7h-8i9j0k1l2m3n',
                                name: 'Gramo',
                                simbol: 'g',
                            },
                        },
                        {
                            id: 'f7g8h9i0-1a2b-3c4d-5e6f-7g8h9i0j1k2l',
                            name: 'Lechuga',
                            measurementUnit: {
                                id: 'h1i2j3k4-5l6m-7n8o-9p0q-1r2s3t4u5v6w',
                                name: 'Gramo',
                                simbol: 'g',
                            },
                        },
                    ],
                },
            }
        ],
    },
]

export default async function OrderByIdPage({ params }: OrderByIdPageProps) {
    const { orderId } = await params
    let order: OrderDTO | undefined

    try {
        const response = await OrderService.getById('', orderId)
        order = response.data
    } catch {
        order = MOCK_ORDER_DETAILS.find((item) => item.id === orderId)
    }

    if (!order) {
        return <ContainerPage>No se encontro la orden solicitada.</ContainerPage>
    }

    return (
        <ContainerPage>
            <OrderDetailScreen order={order} />
        </ContainerPage>
    )
}