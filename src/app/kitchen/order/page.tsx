import { ContainerPage } from '@/components/page/ContainerPage'
import { OrderListScreen, MOCK_ORDERS } from '@/screens/kitchen/order/OrderListScreen'
import { OrderDTO } from '@/models/kitchen/orders/Order'
import { OrderService } from '@/services/kitchen/OrderService'

export default async function KitchenOrderPage() {
    let orders: OrderDTO[] = []

    try {
        const response = await OrderService.getAll('', {
            page: 1,
            pageSize: 100,
        })

        orders = response.data
    } catch {
        orders = MOCK_ORDERS
    }

    return (
        <ContainerPage>
            <OrderListScreen orders={orders} />
        </ContainerPage>
    )
}
