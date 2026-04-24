import { ContainerPage } from '@/components/page/ContainerPage'
import { Category } from '@/models/meal-plan/categories/Category'
import { UnitMeasurement } from '@/models/meal-plan/unit-measurement/UnitMeasurement'
import { CategoryService } from '@/services/meal-plan/CategoryService'
import { UnitMeasurementService } from '@/services/meal-plan/UnitMeasurementService'
import { IngredientFormScreen } from '@/screens/meal-plan/ingredient/IngredientFormScreen'

export default async function CreateIngredientPage() {
    let categories: Category[] = []
    let unitMeasurements: UnitMeasurement[] = []

    try {
        const responseCategories = await CategoryService.getAll('')
        const responseUnitMeasurements = await UnitMeasurementService.getAll('')
        categories = responseCategories.value
        unitMeasurements = responseUnitMeasurements.value
    } catch {
        categories = []
        unitMeasurements = []
    }

    return (
        <ContainerPage>
            <IngredientFormScreen
                categories={categories}
                unitMeasurements={unitMeasurements}
            />
        </ContainerPage>
    )
}