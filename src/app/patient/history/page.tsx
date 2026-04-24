import { ContainerPage } from '@/components/page/ContainerPage'
import { PatientHistoryListScreen } from '@/screens/patient/PatientHistoryListScreen'
import { Patient } from '@/models/patient/patients/Patient'
import { PatientService } from '@/services/patient/PatientService'
import { cookies } from 'next/headers'

export default async function PatientHistoryPage() {
    const token = (await cookies()).get('auth_token')?.value ?? ''

    let patients: Patient[] = []
    try {
        const response = await PatientService.getAll(token, { page: 1, pageSize: 100 })
        const value = response.value as unknown

        if (Array.isArray(value)) {
            patients = value as Patient[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            patients = ((value as { items?: Patient[] }).items ?? [])
        }
    } catch {
        patients = []
    }

    return (
        <ContainerPage>
            <PatientHistoryListScreen patients={patients} />
        </ContainerPage>
    )
}