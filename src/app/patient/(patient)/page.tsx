import { PatientListScreen } from '@/screens/patient/PatientListScreen';
import { ContainerPage } from '@/components/page/ContainerPage'
import { Patient } from '@/models/patient/patients/Patient';
import { PatientService } from '@/services/patient/PatientService';
import { cookies } from 'next/headers';

export default async function PatientList() {
    const token = (await cookies()).get('auth_token')?.value ?? ''

    let patients: Patient[] = []
    try {
        const response = await PatientService.getAll(token, { page: 1, pageSize: 100 })
        const value = response.value as unknown
        console.log('Response value:', response)
        if (Array.isArray(value)) {
            patients = value as Patient[]
        } else if (value && typeof value === 'object' && 'items' in (value as Record<string, unknown>)) {
            patients = ((value as { items?: Patient[] }).items ?? [])
        }
    } catch (error) {
        console.error('Error fetching patients:', error)
        patients = []
    }

    return (
        <ContainerPage> 
            <PatientListScreen patients={patients} />
        </ContainerPage>
    )
}
