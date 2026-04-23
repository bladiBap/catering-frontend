import { ContainerPage } from '@/components/page/ContainerPage'
import { MOCK_PATIENTS } from '@/screens/patient/PatientListScreen'
import { MealPlanPatientListScreen } from '@/screens/meal-plan/MealPlanPatientListScreen'

export default async function MealPlanPage() {
    return (
        <ContainerPage>
            <MealPlanPatientListScreen patients={MOCK_PATIENTS} />
        </ContainerPage>
    )
}