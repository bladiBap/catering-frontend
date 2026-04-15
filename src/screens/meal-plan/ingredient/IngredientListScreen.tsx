import Link from 'next/link'

import { Ingredient } from '@/models/meal-plan/ingredients/Ingredient'
import { IngredientCard } from '@/components/meal-plan/IngredientCard'
import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'

const MOCK_INGREDIENTS: Ingredient[] = [
    {
        id: '1',
        nombre: 'Avena',
        calorias: 389,
        cantidadValor: 100,
        categoriaId: 'aasdasdeqweqwae12341231',
        unidadId: 1,
    },
    {
        id: '2',
        nombre: 'Pechuga de pollo',
        calorias: 165,
        cantidadValor: 100,
        categoriaId: 'aasdasdeqweqwae12341231a',
        unidadId: 1,
    },
]

export async function IngredientListScreen() {
    return (
        <>
            <div className="flex flex-row justify-between">
                <TitlePage title="Lista de Ingredientes" />
                <Link
                    href="/meal-plan/ingredient/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-10"
                >
                    Crear Ingrediente
                </Link>
            </div>
            <GridContainer>
                {MOCK_INGREDIENTS.map((ingredient) => (
                    <IngredientCard key={ingredient.id} ingredient={ingredient} />
                ))}
            </GridContainer>
        </>
    )
}