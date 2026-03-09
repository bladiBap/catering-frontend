import { BloodType } from '@/enums/patient/BloodType';
import { ContainerPage } from '@/components/page/ContainerPage';
import { ContactScreen } from '@/screens/patient/contact/ContactScreen';
import { PatientInfo } from '@/components/patient/PatientInfo';

export default async function ContactPage() {
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
            <PatientInfo patient={patient} />
            <ContactScreen patient={patient} />
        </ContainerPage>
    )
}