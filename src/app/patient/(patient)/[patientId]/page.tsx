import { ContainerPage } from '@/components/page/ContainerPage'
import { Contact } from '@/models/patient/patients/Contact'
import { PatientDetailScreen } from '@/screens/patient/PatientDetailScreen'
import { PatientService } from '@/services/patient/PatientService'
import { cookies } from 'next/headers'

interface PatientDetailPageProps {
    params: Promise<{ patientId: string }>
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
    const { patientId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    const patientResponse = await PatientService.getById(token, patientId)
    if (!patientResponse.isSuccess || !patientResponse.value) {
        return <ContainerPage>No se encontro el paciente solicitado.</ContainerPage>
    }

    const patient = patientResponse.value

    let contacts: Contact[] = []
    try {
        const contactResponse = await PatientService.getContactsByPatientId(token, patientId)
        const value = contactResponse.value as unknown

        if (Array.isArray(value)) {
            contacts = value as Contact[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            contacts = ((value as { items?: Contact[] }).items ?? [])
        }
    } catch {
        const embeddedContacts = (patient as unknown as { contacts?: Contact[] }).contacts
        contacts = Array.isArray(embeddedContacts) ? embeddedContacts : []
    }

    const normalizedPatient = {
        ...patient,
        dateOfBirth: new Date(patient.dateOfBirth),
    }

    return (
        <ContainerPage>
            <PatientDetailScreen patient={normalizedPatient} contacts={contacts} />
        </ContainerPage>
    )
}