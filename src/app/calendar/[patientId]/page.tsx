import { ContainerPage } from '@/components/page/ContainerPage'
import { CalendarPatientDetailScreen } from '@/screens/calendar/CalendarPatientDetailScreen'
import { getMockCalendariosByPatient } from '@/screens/calendar/calendarMockData'
import { CalendarService } from '@/services/calendar/CalendarService'
import { MOCK_PATIENTS } from '@/screens/patient/PatientListScreen'
import { CalendarioDto } from '@/models/calendar/calendario/Calendario'

interface CalendarByPatientPageProps {
    params: Promise<{ patientId: string }>
}

export default async function CalendarByPatientPage({ params }: CalendarByPatientPageProps) {
    const { patientId } = await params
    const patient = MOCK_PATIENTS.find((item) => item.id === patientId)

    if (!patient) {
        return <ContainerPage>No se encontro el paciente solicitado.</ContainerPage>
    }

    let calendars: CalendarioDto[] = []

    try {
        const response = await CalendarService.getByPatient('', patientId)
        calendars = response.value
    } catch {
        calendars = getMockCalendariosByPatient(patientId)
    }

    return (
        <ContainerPage>
            <CalendarPatientDetailScreen patient={patient} calendars={calendars} />
        </ContainerPage>
    )
}
