import { BloodType } from '@/enums/patient/BloodType';
import { ContainerPage } from '@/components/page/ContainerPage';
import { ContactFormScreen } from '@/screens/patient/contact/ContactFormScreen';

export default async function ContactCreatePage() {
    const patient = {
        patientId: '3',
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
            <ContactFormScreen patient={patient} />
        </ContainerPage>
    )
}