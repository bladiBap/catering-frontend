import Link from 'next/link';
import { Patient } from '@/models/patient/patients/Patient';
import { Contact } from '@/models/patient/patients/Contact';

import { TitlePage } from '@/components/page/TitlePage';
import { PatientInfo } from '@/components/patient/PatientInfo';
import { GridContainer } from '@/components/shared/ContainerGrid';
import { ContactCard } from '@/components/patient/ContactCard';

interface PatientDetailScreenProps {
    patient: Patient,
    contacts: Contact[],
}

export function PatientDetailScreen({ patient, contacts = [] }: PatientDetailScreenProps) {
    return (
        <div className="min-h-screen container mx-auto flex flex-col gap-6 px-4">
            <PatientInfo patient={patient} />
            <div className="mb-4 flex justify-between">
                <TitlePage title="Contactos" />
                <Link href={`/patient/contact/${patient.id}`} className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-10'>
                    Crear Contacto
                </Link>
            </div>
            <GridContainer>
                {contacts.map(contact => (
                    <ContactCard key={contact.contactId} contact={contact} patientId={patient.id} />
                ))}
            </GridContainer>
        </div>
    );
}