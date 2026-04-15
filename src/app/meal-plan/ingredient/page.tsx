import { ContainerPage } from '@/components/page/ContainerPage'
import { IngredientListScreen } from '@/screens/meal-plan/ingredient/IngredientListScreen'

export default async function IngredientListPage() {
    return (
        <ContainerPage>
            <IngredientListScreen />
        </ContainerPage>
    )
}