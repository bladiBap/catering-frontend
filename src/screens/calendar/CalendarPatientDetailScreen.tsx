import Link from 'next/link'

import { PatientInfo } from '@/components/patient/PatientInfo'
import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { CalendarCard } from '@/components/calendar/CalendarCard'
import { CalendarioDto } from '@/models/calendar/calendario/Calendario'
import { Patient } from '@/models/patient/patients/Patient'

interface CalendarPatientDetailScreenProps {
    patient: Patient
    calendars: CalendarioDto[]
}

export function CalendarPatientDetailScreen({ patient, calendars }: CalendarPatientDetailScreenProps) {
    return (
        <div className="flex flex-col gap-6">
            <PatientInfo patient={patient} />

            <div className="flex flex-wrap items-center justify-between gap-3">
                <TitlePage title="Calendarios" />
                <Link
                    href="/calendar"
                    className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                    Volver al listado
                </Link>
            </div>

            <GridContainer emptyMessage="No hay calendarios para mostrar">
                {calendars.map((calendar) => (
                    <CalendarCard key={calendar.Id} patientId={patient.id} calendar={calendar} />
                ))}
            </GridContainer>
        </div>
    )
}