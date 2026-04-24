import { CalendarPatientCard } from '@/components/calendar/CalendarPatientCard'
import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { Patient } from '@/models/patient/patients/Patient'

interface CalendarPatientListScreenProps {
    patients: Patient[]
}

export function CalendarPatientListScreen({ patients }: CalendarPatientListScreenProps) {
    return (
        <>
            <div className="flex flex-row justify-between gap-3">
                <TitlePage title="Calendarios" />
            </div>

            <GridContainer emptyMessage="No hay pacientes para mostrar">
                {patients.map((patient) => (
                    <CalendarPatientCard key={patient.id} patient={patient} />
                ))}
            </GridContainer>
        </>
    )
}
