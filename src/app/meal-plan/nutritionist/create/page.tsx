import { ContainerPage } from '@/components/page/ContainerPage'
import { NutritionistFormScreen } from '@/screens/meal-plan/nutritionist/NutritionistFormScreen'

export default async function CreateNutritionistPage() {
    return (
        <ContainerPage>
            <NutritionistFormScreen />
        </ContainerPage>
    )
}
