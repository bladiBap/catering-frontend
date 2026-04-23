import { CalendarioDto } from '@/models/calendar/calendario/Calendario'

export const MOCK_CALENDARIOS: CalendarioDto[] = [
    {
        Id: 'calendar-1',
        PacienteId: '1',
        PlanAlimenticioId: 'meal-plan-1',
        FechaInicio: '2026-04-15',
        FechaFin: '2026-04-21',
        Activo: true,
        PorcentajeCompletado: 35,
        Direcciones: [
            {
                Id: 'direction-1',
                Fecha: '2026-04-15',
                Direccion: 'Av. Principal 123',
                Referencias: 'Edificio azul, segundo portón',
                Latitud: -16.5001,
                Longitud: -68.1193,
                EsEntregaActiva: true,
                DiasRestantes: 3,
            },
            {
                Id: 'direction-2',
                Fecha: '2026-04-16',
                Direccion: 'Calle Secundaria 456',
                Referencias: 'Cerca a la farmacia central',
                Latitud: -16.5014,
                Longitud: -68.1181,
                EsEntregaActiva: false,
                DiasRestantes: 2,
            },
        ],
    },
    {
        Id: 'calendar-2',
        PacienteId: '1',
        PlanAlimenticioId: 'meal-plan-2',
        FechaInicio: '2026-04-22',
        FechaFin: '2026-04-28',
        Activo: false,
        PorcentajeCompletado: 100,
        Direcciones: [
            {
                Id: 'direction-3',
                Fecha: '2026-04-22',
                Direccion: 'Av. Libertad 789',
                Referencias: 'Frente al parque principal',
                Latitud: -16.5099,
                Longitud: -68.1102,
                EsEntregaActiva: false,
                DiasRestantes: 0,
            },
        ],
    },
]

export function getMockCalendariosByPatient(patientId: string) {
    return MOCK_CALENDARIOS.filter((calendar) => calendar.PacienteId === patientId)
}

export function getMockCalendarioById(calendarId: string) {
    return MOCK_CALENDARIOS.find((calendar) => calendar.Id === calendarId)
}