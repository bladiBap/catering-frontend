import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'

export function OrderCreateScreen() {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <TitlePage title="Crear Orden" />
                <Link
                    href="/kitchen/order"
                    className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                    Volver a ordenes
                </Link>
            </div>

            <p className="text-sm text-slate-600">
                Aqui ira el formulario para crear una orden.
            </p>
        </div>
    )
}
