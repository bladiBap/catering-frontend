import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { RecipeCard } from '@/components/meal-plan/RecipeCard'
import { Recipe } from '@/models/meal-plan/recipe/Recipe'

interface RecipeListScreenProps {
    recipes: Recipe[]
}

export function RecipeListScreen({ recipes }: RecipeListScreenProps) {
    return (
        <>
            <div className="mb-4 flex flex-row justify-between">
                <TitlePage title="Lista de Recetas" />
                <Link
                    href="/meal-plan/recipe/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-10"
                >
                    Crear Receta
                </Link>
            </div>

            <GridContainer emptyMessage="No hay recetas para mostrar">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </GridContainer>
        </>
    )
}
