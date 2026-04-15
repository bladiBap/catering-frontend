import { ContainerPage } from '@/components/page/ContainerPage'
import { PatientFormScreen } from '@/screens/patient/PatientFormScreen'

export default async function CreatePatient() {
    return (
        <ContainerPage>
            <PatientFormScreen />
        </ContainerPage>
    )
}