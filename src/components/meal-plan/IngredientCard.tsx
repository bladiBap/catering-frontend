import { Ingredient } from '@/models/meal-plan/ingredients/Ingredient'

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'proteina': 'bg-red-100 text-red-800 border border-red-300',
            'carbohidrato': 'bg-amber-100 text-amber-800 border border-amber-300',
            'grasa': 'bg-orange-100 text-orange-800 border border-orange-300',
            'vitamina': 'bg-green-100 text-green-800 border border-green-300',
            'mineral': 'bg-blue-100 text-blue-800 border border-blue-300',
            'fibra': 'bg-purple-100 text-purple-800 border border-purple-300',
            'otro': 'bg-gray-100 text-gray-800 border border-gray-300',
        }
        return colors[category.toLowerCase()] || colors['otro']
    }

    const getCaloriaColor = (calorias: number) => {
        if (calorias > 300) return 'text-red-600'
        if (calorias > 200) return 'text-orange-600'
        return 'text-green-600'
    }

    return (
        <article className="group w-full h-full bg-linear-to-r from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
            {/* Header with gradient accent */}
            <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {ingredient.nombre}
                </h2>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Calorias */}
                <div className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">Calorías</span>
                        <span className={`text-2xl font-bold ${getCaloriaColor(ingredient.calorias)}`}>
                            {ingredient.calorias}
                        </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Kcal por {ingredient.cantidadValor}g</div>
                </div>

                {/* Cantidad */}
                <div className="bg-blue-50 rounded-lg p-3 hover:bg-blue-100 transition-colors border border-blue-100">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">Cantidad</span>
                        <span className="text-lg font-bold text-blue-600">{ingredient.cantidadValor}g</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Porción estándar</div>
                </div>

                {/* Categoria y Unidad */}
                <div className="space-y-3">
                    <div>
                        <div className="text-xs font-semibold text-gray-600 mb-2">Categoría</div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(ingredient.categoriaId)}`}>
                            {ingredient.categoriaId}
                        </span>
                    </div>

                    <div>
                        <div className="text-xs font-semibold text-gray-600 mb-2">Unidad de medida</div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">
                            ID: {ingredient.unidadId}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer accent */}
            <div className="h-1 bg-linear-to-r from-blue-400 via-indigo-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </article>
    )
}