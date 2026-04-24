import { ContainerPage } from '@/components/page/ContainerPage'
import { PatientFormScreen } from '@/screens/patient/PatientFormScreen'
import { PatientService } from '@/services/patient/PatientService'
import { cookies } from 'next/headers'

interface UpdatePatientProps {
    params: Promise<{ patientId: string }>
}

export default async function UpdatePatient({ params }: UpdatePatientProps) {
    const { patientId } = await params
    const token = (await cookies()).get('auth_token')?.value ?? ''

    const response = await PatientService.getById(token, patientId)
    if (!response.isSuccess || !response.value) {
        return <ContainerPage>No se encontro el paciente solicitado.</ContainerPage>
    }

    const patient = {
        ...response.value,
        dateOfBirth: new Date(response.value.dateOfBirth),
    }

    return (
        <ContainerPage>
            <PatientFormScreen patient={patient} />
        </ContainerPage>
    )
}