import { ContainerPage } from '@/components/page/ContainerPage'
import { BloodType } from '@/enums/patient/BloodType'
import { PatientFormScreen } from '@/screens/patient/PatientFormScreen'

export default async function UpdatePatient() {
    
    const patient = {
        firstName: 'Roberto',
        middleName: 'Carlos',
        lastName: 'Méndez',
        bloodType: BloodType.B_NEGATIVE,
        documentNumber: '4561237890',
        dateOfBirth: new Date(1978, 1, 5),
        ocupation: 'Arquitecto',
        religion: 'Evangélico',
        alergies: 'Ninguna',
    }

    return (
        <ContainerPage>
            <PatientFormScreen patient={patient}/>
        </ContainerPage>
    )
}