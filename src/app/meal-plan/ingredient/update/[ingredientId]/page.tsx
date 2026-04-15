import { ContainerPage } from '@/components/page/ContainerPage'
import { Category } from '@/models/meal-plan/categories/Category'
import { Ingredient } from '@/models/meal-plan/ingredients/Ingredient'
import { UnitMeasurement } from '@/models/meal-plan/unit-measurement/UnitMeasurement'
import { CategoryService } from '@/services/meal-plan/CategoryService'
import { UnitMeasurementService } from '@/services/meal-plan/UnitMeasurementService'
import { IngredientFormScreen } from '@/screens/meal-plan/ingredient/IngredientFormScreen'

interface UpdateIngredientPageProps {
    params: Promise<{ ingredientId: string }>
}

export default async function UpdateIngredientPage({ params }: UpdateIngredientPageProps) {
    const { ingredientId } = await params

    let categories: Category[] = []
    let unitMeasurements: UnitMeasurement[] = []

    try {
        const responseCategories = await CategoryService.getAll('')
        const responseUnitMeasurements = await UnitMeasurementService.getAll('')
        categories = responseCategories.data
        unitMeasurements = responseUnitMeasurements.data
    } catch {
        categories = []
        unitMeasurements = []
    }

    const ingredient: Ingredient = {
        id: ingredientId,
        nombre: 'Ingrediente de ejemplo',
        calorias: 0,
        cantidadValor: 0,
        categoriaId: categories[0]?.id || '',
        unidadId: 1,
    }

    return (
        <ContainerPage>
            <IngredientFormScreen
                ingredient={ingredient}
                categories={categories}
                unitMeasurements={unitMeasurements}
            />
        </ContainerPage>
    )
}