import { Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist'

interface NutritionistCardProps {
    nutritionist: Nutritionist
}

export function NutritionistCard({ nutritionist }: NutritionistCardProps) {
    const formattedCreationDate = new Date(nutritionist.fechaCreacion).toLocaleDateString('es-BO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    return (
        <article className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{nutritionist.nombre}</h2>
                <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        nutritionist.activo
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}
                >
                    {nutritionist.activo ? 'Activo' : 'Inactivo'}
                </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium">ID</span>
                    <span className="truncate ml-3 text-gray-500">{nutritionist.id}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Fecha creacion</span>
                    <span>{formattedCreationDate}</span>
                </div>
            </div>
        </article>
    )
}
