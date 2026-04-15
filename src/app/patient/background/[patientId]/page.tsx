import { ContainerPage } from '@/components/page/ContainerPage'
import { History } from '@/models/patient/histories/History'
import { BackgroundFormScreen } from '@/screens/patient/background/BackgroundFormScreen'

interface BackgroundCreatePageProps {
    params: Promise<{ patientId: string }>
}

export default async function BackgroundCreatePage({ params }: BackgroundCreatePageProps) {
    const { patientId } = await params

    const history: History = {
        historyId: 'hist-1',
        patientId,
        foodPlanId: 'food-plan-1',
        reason: 'Control de rutina',
        diagnostic: 'Paciente estable',
        treatment: 'Continuar plan nutricional',
    }

    return (
        <ContainerPage>
            <BackgroundFormScreen history={history} />
        </ContainerPage>
    )
}