import Link from 'next/link'

import { PackageDTO, StatusPackage } from '@/models/kitchen/packages/Package'

interface PackageCardProps {
    packageItem: PackageDTO
}

const STATUS_LABEL: Record<StatusPackage, string> = {
    [StatusPackage.CREATED]: 'Creado',
    [StatusPackage.COMPLETED]: 'Completado',
}

export function PackageCard({ packageItem }: PackageCardProps) {
    const isCreated = packageItem.status === StatusPackage.CREATED

    return (
        <Link
            href={`/kitchen/package/${packageItem.id}`}
            className="block w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Paquete #{packageItem.id}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Creado: {new Date(packageItem.dateCreatedOn).toLocaleString('es-ES')}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        isCreated ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}
                >
                    {STATUS_LABEL[packageItem.status]}
                </span>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p>
                    <span className="text-slate-400">Fecha de paquete:</span>{' '}
                    {new Date(packageItem.dateOrdered).toLocaleDateString('es-ES')}
                </p>
                <p>
                    <span className="text-slate-400">Items:</span> {packageItem.packageItems.length}
                </p>
            </div>
        </Link>
    )
}