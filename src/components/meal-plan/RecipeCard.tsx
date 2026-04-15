import Link from 'next/link'

import { Recipe } from '@/models/meal-plan/recipe/Recipe'

interface RecipeCardProps {
    recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <article className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{recipe.nombre}</h2>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium">Tiempo ID</span>
                    <span>{recipe.tiempoId}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="font-medium">Ingredientes</span>
                    <span>{recipe.ingredienteList.length}</span>
                </div>
                <div>
                    <p className="font-medium mb-1">Instrucciones</p>
                    <p className="line-clamp-3">{recipe.instrucciones}</p>
                </div>

                <div className="pt-2">
                    <Link
                        href={`/meal-plan/recipe/update/${recipe.id}`}
                        className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Editar receta
                    </Link>
                </div>
            </div>
        </article>
    )
}
