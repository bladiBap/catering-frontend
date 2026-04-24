import { ContainerPage } from '@/components/page/ContainerPage'
import { MealPlan } from '@/models/meal-plan/meal-plan/MealPlan'
import { Patient } from '@/models/patient/patients/Patient'
import { MealPlanListScreen } from '@/screens/meal-plan/MealPlanListScreen'
import { PatientService } from '@/services/patient/PatientService'
import { MealPlanService } from '@/services/meal-plan/MealPlanService'
import { cookies } from 'next/headers'

interface MealPlanByPatientPageProps {
    params: Promise<{ patientId: string }>
}

export default async function MealPlanByPatientPage({ params }: MealPlanByPatientPageProps) {
    const { patientId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    const patientResponse = await PatientService.getById(token, patientId)
    if (!patientResponse.isSuccess || !patientResponse.value) {
        return <ContainerPage>No se encontro el paciente solicitado.</ContainerPage>
    }

    const patient = patientResponse.value as Patient

    let mealPlans: MealPlan[] = []
    try {
        const mealPlanResponse = await MealPlanService.getById(token, patientId)
        const value = mealPlanResponse.value as unknown

        if (Array.isArray(value)) {
            mealPlans = value as MealPlan[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            mealPlans = ((value as { items?: MealPlan[] }).items ?? [])
        }
    } catch {
        mealPlans = []
    }

    const content = MealPlanListScreen({ patient, mealPlans })

    return ContainerPage({
        children: content,
    })
}