import { ContainerPage } from '@/components/page/ContainerPage'
import { PatientHistoryListScreen } from '@/screens/patient/PatientHistoryListScreen'

export default async function PatientHistoryPage() {
    return (
        <ContainerPage>
            <PatientHistoryListScreen />
        </ContainerPage>
    )
}