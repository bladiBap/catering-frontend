import { BloodType } from '@/enums/patient/BloodType';
import { ContainerPage } from '@/components/page/ContainerPage';
import { ContactFormScreen } from '@/screens/patient/contact/ContactFormScreen';
import { Contact } from '@/models/patient/patients/Contact';

export default async function ContactUpdatePage() {
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
    const contact: Contact = {
        contactId: '1',
        patientId: '3',
        coords: '-12.04318, -77.02824',
        floor: '5',
        reference: 'Edificio XYZ, cerca al parque ABC',
        direction: 'Av. Principal 123, Ciudad, País',
        phoneNumber: '+51 987654321',
    }
    
    return (
        <ContainerPage>
            <ContactFormScreen patient={patient} contact={contact}                                                      />
        </ContainerPage>
    )
}