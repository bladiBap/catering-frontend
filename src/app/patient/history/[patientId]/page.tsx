import { ContainerPage } from '@/components/page/ContainerPage'
import { History } from '@/models/patient/histories/History'
import { Evolution } from '@/models/patient/histories/Evolution'
import { Background } from '@/models/patient/histories/Background'
import { HistoryEditorScreen } from '@/screens/patient/history/HistoryEditorScreen'
import { MOCK_PATIENTS_FOR_HISTORY } from '@/screens/patient/PatientHistoryListScreen'

interface HistoryByPatientPageProps {
    params: Promise<{ patientId: string }>
}

const MOCK_HISTORIES: History[] = [
    {
        historyId: 'hist-1',
        patientId: '3',
        foodPlanId: 'food-plan-1',
        reason: 'Control de rutina',
        diagnostic: 'Paciente estable, sin hallazgos relevantes.',
        treatment: 'Continuar alimentacion equilibrada y control mensual.',
    },
]

const MOCK_EVOLUTIONS: Evolution[] = [
    {
        evolutionId: 'evo-1',
        historyId: 'hist-1',
        description: 'Mejoria clinica en la tolerancia alimentaria.',
        observation: 'Sin sintomas gastrointestinales en la ultima semana.',
        medicOrder: 'Mantener plan actual y control en 30 dias.',
    },
]

const MOCK_BACKGROUNDS: Background[] = [
    {
        backgroudId: 'bg-1',
        historyId: 'hist-1',
        description: 'Antecedente de gastritis cronica controlada.',
    },
]

export default async function HistoryByPatientPage({ params }: HistoryByPatientPageProps) {
    const { patientId } = await params

    const patient = MOCK_PATIENTS_FOR_HISTORY.find((item) => item.id === patientId)
    const existingHistory = MOCK_HISTORIES.find((item) => item.patientId === patientId)
    const evolutions = existingHistory
        ? MOCK_EVOLUTIONS.filter((item) => item.historyId === existingHistory.historyId)
        : []
    const backgrounds = existingHistory
        ? MOCK_BACKGROUNDS.filter((item) => item.historyId === existingHistory.historyId)
        : []

    return (
        <ContainerPage>
            {patient ? (
                <HistoryEditorScreen
                    patient={patient}
                    existingHistory={existingHistory}
                    evolutions={evolutions}
                    backgrounds={backgrounds}
                />
            ) : (
                <p className="text-sm text-red-600">No se encontro el paciente solicitado.</p>
            )}
        </ContainerPage>
    )
}