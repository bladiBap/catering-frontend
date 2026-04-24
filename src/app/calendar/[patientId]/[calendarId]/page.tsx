import { ContainerPage } from '@/components/page/ContainerPage'
import { CalendarDetailScreen } from '@/screens/calendar/CalendarDetailScreen'
import { getMockCalendarioById } from '@/screens/calendar/calendarMockData'
import { CalendarService } from '@/services/calendar/CalendarService'
import { MOCK_PATIENTS } from '@/screens/patient/PatientListScreen'
import { CalendarioDto } from '@/models/calendar/calendario/Calendario'

interface CalendarDetailPageProps {
    params: Promise<{ patientId: string; calendarId: string }>
}

export default async function CalendarDetailPage({ params }: CalendarDetailPageProps) {
    const { patientId, calendarId } = await params
    const patient = MOCK_PATIENTS.find((item) => item.id === patientId)

    if (!patient) {
        return <ContainerPage>No se encontro el paciente solicitado.</ContainerPage>
    }

    let calendar: CalendarioDto | undefined

    try {
        const response = await CalendarService.getById('', calendarId)
        calendar = response.value
    } catch {
        calendar = getMockCalendarioById(calendarId)
    }

    if (!calendar) {
        return <ContainerPage>No se encontro el calendario solicitado.</ContainerPage>
    }

    return (
        <ContainerPage>
            <CalendarDetailScreen patient={patient} calendar={calendar} />
        </ContainerPage>
    )
}