import { ContainerPage } from '@/components/page/ContainerPage'
import { Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist'
import { Recipe } from '@/models/meal-plan/recipe/Recipe'
import { NutritionistService } from '@/services/meal-plan/NutritionistService'
import { RecipeService } from '@/services/meal-plan/RecipeService'
import { MealPlanFormScreen } from '@/screens/meal-plan/MealPlanFormScreen'

interface CreateMealPlanPageProps {
    params: Promise<{ patientId: string }>
}

const MOCK_NUTRITIONISTS: Nutritionist[] = [
    {
        id: '6c54b71f-4a1b-47c1-aca4-0ceca607d5eb',
        nombre: 'Andres Castro',
        fechaCreacion: '2024-01-01T21:47:20Z',
        activo: true,
    },
]

const MOCK_RECIPES: Recipe[] = [
    {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        nombre: 'Avena con frutas',
        tiempoId: 1,
        instrucciones: 'Mezclar la avena con frutas picadas y servir.',
        ingredienteList: [
            { id: '1', cantidadValor: 100 },
            { id: '2', cantidadValor: 50 },
        ],
    },
    {
        id: 'recipe-2',
        nombre: 'Pollo al horno con verduras',
        tiempoId: 2,
        instrucciones: 'Hornear el pollo con zanahoria, zapallo y cebolla hasta dorar.',
        ingredienteList: [
            { id: '3', cantidadValor: 180 },
            { id: '4', cantidadValor: 70 },
        ],
    },
    {
        id: 'recipe-3',
        nombre: 'Ensalada fresca de atún',
        tiempoId: 3,
        instrucciones: 'Mezclar atún con hojas verdes, tomate y aceite de oliva.',
        ingredienteList: [
            { id: '5', cantidadValor: 120 },
            { id: '6', cantidadValor: 40 },
        ],
    },
    {
        id: 'recipe-4',
        nombre: 'Sopa de lentejas',
        tiempoId: 1,
        instrucciones: 'Cocinar lentejas con vegetales y condimentar al gusto.',
        ingredienteList: [
            { id: '7', cantidadValor: 200 },
            { id: '8', cantidadValor: 60 },
        ],
    },
]

export default async function CreateMealPlanPage({ params }: CreateMealPlanPageProps) {
    const { patientId } = await params
    let nutritionists: Nutritionist[] = []
    let recipes: Recipe[] = []

    try {
        const responseNutritionists = await NutritionistService.getAll('', {
            page: 1,
            pageSize: 50,
        })

        nutritionists = responseNutritionists.data
    } catch {
        nutritionists = MOCK_NUTRITIONISTS
    }

    try {
        const responseRecipes = await RecipeService.getAll('', {
            page: 1,
            pageSize: 50,
        })

        recipes = responseRecipes.data
    } catch {
        recipes = MOCK_RECIPES
    }

    return (
        <ContainerPage>
            <MealPlanFormScreen
                patientId={patientId}
                nutritionists={nutritionists}
                recipes={recipes}
            />
        </ContainerPage>
    )
}