import { PatientListScreen } from '@/screens/patient/PatientListScreen';
import { ContainerPage } from '@/components/page/ContainerPage'

export default async function PatientList() {
    return (
        <ContainerPage> 
            <PatientListScreen />
        </ContainerPage>
    )
}
