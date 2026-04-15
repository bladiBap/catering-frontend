import { ContainerPage } from '@/components/page/ContainerPage'
import { Course } from '@/models/meal-plan/course/Course'
import { Ingredient } from '@/models/meal-plan/ingredients/Ingredient'
import { Recipe } from '@/models/meal-plan/recipe/Recipe'
import { CourseService } from '@/services/meal-plan/CourseService'
import { RecipeFormScreen } from '@/screens/meal-plan/recipe/RecipeFormScreen'

const MOCK_INGREDIENTS: Ingredient[] = [
    {
        id: 'ingredient-1',
        nombre: 'Avena',
        calorias: 389,
        cantidadValor: 100,
        categoriaId: 'carbohidrato',
        unidadId: 1,
    },
    {
        id: 'ingredient-2',
        nombre: 'Leche descremada',
        calorias: 42,
        cantidadValor: 100,
        categoriaId: 'lacteo',
        unidadId: 2,
    },
    {
        id: 'ingredient-3',
        nombre: 'Platano',
        calorias: 89,
        cantidadValor: 100,
        categoriaId: 'fruta',
        unidadId: 1,
    },
]

const MOCK_COURSES: Course[] = [
    { id: '1', nombre: 'Desayuno' },
    { id: '2', nombre: 'Almuerzo' },
    { id: '3', nombre: 'Cena' },
]

interface UpdateRecipePageProps {
    params: Promise<{ recipeId: string }>
}

export default async function UpdateRecipePage({ params }: UpdateRecipePageProps) {
    const { recipeId } = await params

    const ingredients: Ingredient[] = MOCK_INGREDIENTS
    let courses: Course[] = []

    try {
        const response = await CourseService.getAll('')
        courses = response.data
    } catch {
        courses = MOCK_COURSES
    }

    const recipe: Recipe = {
        id: recipeId,
        nombre: 'Receta de ejemplo',
        tiempoId: Number(courses[0]?.id || '1'),
        instrucciones: 'Instrucciones de ejemplo para actualizar la receta.',
        ingredienteList: [
            { id: ingredients[0]?.id || 'ingredient-1', cantidadValor: 100 },
            { id: ingredients[1]?.id || 'ingredient-2', cantidadValor: 150 },
        ],
    }

    return (
        <ContainerPage>
            <RecipeFormScreen recipe={recipe} ingredients={ingredients} courses={courses} />
        </ContainerPage>
    )
}
