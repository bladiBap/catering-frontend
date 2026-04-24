import { ContainerPage } from '@/components/page/ContainerPage'
import { HistoryFormScreen } from '@/screens/patient/history/HistoryFormScreen'
import { MOCK_PATIENTS_FOR_HISTORY } from '@/screens/patient/PatientHistoryListScreen'

interface HistoryCreatePageProps {
    params: Promise<{ patientId: string }>
}

export default async function HistoryCreatePage({ params }: HistoryCreatePageProps) {
    const { patientId } = await params
    const patient = MOCK_PATIENTS_FOR_HISTORY.find((item) => item.id === patientId)

    return (
        <ContainerPage>
            {patient ? (
                <HistoryFormScreen patient={patient} />
            ) : (
                <p className="text-sm text-red-600">No se encontro el paciente solicitado.</p>
            )}
        </ContainerPage>
    )
}
