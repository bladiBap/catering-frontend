import { ContainerPage } from '@/components/page/ContainerPage'
import { Recipe } from '@/models/meal-plan/recipe/Recipe'
import { RecipeService } from '@/services/meal-plan/RecipeService'
import { RecipeListScreen } from '@/screens/meal-plan/recipe/RecipeListScreen'

const MOCK_RECIPES: Recipe[] = [
    {
        id: 'recipe-1',
        nombre: 'Avena con frutas',
        tiempoId: 1,
        instrucciones: 'Mezclar la avena con frutas picadas y servir.',
        ingredienteList: [
            { id: '1', cantidadValor: 100 },
            { id: '2', cantidadValor: 50 },
        ],
    },
]

export default async function RecipeListPage() {
    let recipes: Recipe[] = []

    try {
        const response = await RecipeService.getAll('', {
            page: 1,
            pageSize: 20,
        })

        recipes = response.value
    } catch {
        recipes = MOCK_RECIPES
    }

    return (
        <ContainerPage>
            <RecipeListScreen recipes={recipes} />
        </ContainerPage>
    )
}
