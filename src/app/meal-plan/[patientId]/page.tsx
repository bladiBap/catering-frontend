import { ContainerPage } from '@/components/page/ContainerPage'
import { MealPlan } from '@/models/meal-plan/meal-plan/MealPlan'
import { Patient } from '@/models/patient/patients/Patient'
import { MOCK_PATIENTS } from '@/screens/patient/PatientListScreen'
import { MealPlanListScreen } from '@/screens/meal-plan/MealPlanListScreen'

interface MealPlanByPatientPageProps {
    params: Promise<{ patientId: string }>
}

const MOCK_MEAL_PLANS: MealPlan[] = [
    {
        id: 'meal-plan-1',
        pacienteId: '1',
        nutricionistaId: '6c54b71f-4a1b-47c1-aca4-0ceca607d5eb',
        fechaInicio: '2026-04-15T19:18:36.791Z',
        duracionDias: 15,
        dietas: [
            {
                fecha: '2026-04-15',
                recetas: [
                    {
                        orden: 1,
                        tiempoId: 1,
                        recetaId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    },
                ],
            },
            {
                fecha: '2026-04-16',
                recetas: [
                    {
                        orden: 1,
                        tiempoId: 1,
                        recetaId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    },
                ],
            },
        ],
    },
    {
        id: 'meal-plan-2',
        pacienteId: '1',
        nutricionistaId: '6c54b71f-4a1b-47c1-aca4-0ceca607d5eb',
        fechaInicio: '2026-04-20T10:00:00.000Z',
        duracionDias: 7,
        dietas: [
            {
                fecha: '2026-04-20',
                recetas: [
                    {
                        orden: 1,
                        tiempoId: 2,
                        recetaId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    },
                ],
            },
        ],
    },
]

export default async function MealPlanByPatientPage({ params }: MealPlanByPatientPageProps) {
    const { patientId } = await params

    const patient = MOCK_PATIENTS.find((item) => item.patientId === patientId) as Patient | undefined
    const mealPlans = MOCK_MEAL_PLANS.filter((item) => item.pacienteId === patientId)
    const content = patient ? MealPlanListScreen({ patient, mealPlans }) : 'No se encontro el paciente solicitado.'

    return ContainerPage({
        children: content,
    })
}