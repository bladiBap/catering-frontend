import Link from 'next/link'

import { CalendarioDto } from '@/models/calendar/calendario/Calendario'

interface CalendarCardProps {
    patientId: string
    calendar: CalendarioDto
}

export function CalendarCard({ patientId, calendar }: CalendarCardProps) {
    return (
        <Link
            href={`/calendar/${patientId}/${calendar.Id}`}
            className="w-full rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Calendario {calendar.Id}</h2>
                    <p className="mt-1 text-sm text-slate-500">Plan alimenticio: {calendar.PlanAlimenticioId}</p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        calendar.Activo ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}
                >
                    {calendar.Activo ? 'Activo' : 'Inactivo'}
                </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-2">
                <p>
                    <span className="text-slate-400">Inicio:</span>{' '}
                    {new Date(calendar.FechaInicio).toLocaleDateString('es-ES')}
                </p>
                <p>
                    <span className="text-slate-400">Fin:</span>{' '}
                    {new Date(calendar.FechaFin).toLocaleDateString('es-ES')}
                </p>
                <p>
                    <span className="text-slate-400">Completado:</span> {calendar.PorcentajeCompletado}%
                </p>
                <p>
                    <span className="text-slate-400">Direcciones:</span> {calendar.Direcciones.length}
                </p>
            </div>
        </Link>
    )
}