import { ContainerPage } from '@/components/page/ContainerPage'
import { History } from '@/models/patient/histories/History';
import { Background } from '@/models/patient/histories/Background'
import { BackgroundFormScreen } from '@/screens/patient/background/BackgroundFormScreen'

interface BackgroundUpdatePageProps {
    params: Promise<{ patientId: string; historyId: string }>
}

export default async function BackgroundUpdatePage({ params }: BackgroundUpdatePageProps) {
    const { patientId, historyId } = await params

    const history: History = {
        historyId,
        patientId,
        foodPlanId: 'food-plan-1',
        reason: 'Control de rutina',
        diagnostic: 'Paciente estable',
        treatment: 'Continuar plan nutricional',
    }

    const background: Background = {
        backgroudId: 'bg-1',
        historyId,
        description: 'Antecedente de gastritis cronica controlada.',
    }
    
    return (
        <ContainerPage>
            <BackgroundFormScreen history={history} background={background} />
        </ContainerPage>
    )
}