import { ContainerPage } from '@/components/page/ContainerPage'
import { CalendarPatientListScreen } from '@/screens/calendar/CalendarPatientListScreen'
import { MOCK_PATIENTS } from '@/screens/patient/PatientListScreen'

export default async function CalendarPage() {
    return (
        <ContainerPage>
            <CalendarPatientListScreen patients={MOCK_PATIENTS} />
        </ContainerPage>
    )
}
