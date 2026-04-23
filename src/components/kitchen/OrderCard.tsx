import Link from 'next/link'

import { OrderDTO, StatusOrder } from '@/models/kitchen/orders/Order'

interface OrderCardProps {
    order: OrderDTO
}

const STATUS_LABEL: Record<StatusOrder, string> = {
    [StatusOrder.CREATED]: 'Creada',
    [StatusOrder.COMPLETED]: 'Completada',
}

export function OrderCard({ order }: OrderCardProps) {
    const isCreated = order.status === StatusOrder.CREATED

    return (
        <Link
            href={`/kitchen/order/${order.id}`}
            className="block w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Orden #{order.id}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Creada: {new Date(order.dateCreatedOn).toLocaleString('es-ES')}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isCreated ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                >
                    {STATUS_LABEL[order.status]}
                </span>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p>
                    <span className="text-slate-400">Fecha de orden:</span>{' '}
                    {new Date(order.dateOrdered).toLocaleDateString('es-ES')}
                </p>
                <p>
                    <span className="text-slate-400">Items:</span> {order.orderItems.length}
                </p>
            </div>
        </Link>
    )
}
