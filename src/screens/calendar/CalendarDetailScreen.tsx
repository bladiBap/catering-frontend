 'use client'

import { useState } from 'react'
import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { CalendarDirectionCard } from '@/components/calendar/CalendarDirectionCard'
import { CalendarDirectionEditorModal } from '@/components/calendar/CalendarDirectionEditorModal'
import { CalendarioDto, DireccionDto } from '@/models/calendar/calendario/Calendario'
import { Patient } from '@/models/patient/patients/Patient'
import { CalendarService } from '@/services/calendar/CalendarService'

interface CalendarDetailScreenProps {
    patient: Patient
    calendar: CalendarioDto
}

export function CalendarDetailScreen({ patient, calendar }: CalendarDetailScreenProps) {
    const [calendarState, setCalendarState] = useState(calendar)
    const [isCreateDirectionOpen, setIsCreateDirectionOpen] = useState(false)

    const initialDirectionForCreate: DireccionDto = {
        Id: 'new-direction',
        Fecha: new Date().toISOString().slice(0, 10),
        Direccion: '',
        Referencias: '',
        Latitud: calendarState.Direcciones[0]?.Latitud ?? -16.5,
        Longitud: calendarState.Direcciones[0]?.Longitud ?? -68.15,
        EsEntregaActiva: true,
        DiasRestantes: 0,
    }

    const handleToggleDelivery = async (directionId: string, isActive: boolean) => {
        const currentDirection = calendarState.Direcciones.find((item) => item.Id === directionId)

        if (!currentDirection) {
            throw new Error('No se encontro la direccion para actualizar la entrega')
        }

        if (isActive) {
            await CalendarService.marcarComoEntrega('', {
                calendarioId: calendarState.Id,
                fecha: currentDirection.Fecha,
            })
        } else {
            await CalendarService.marcarComoNoEntrega('', {
                calendarioId: calendarState.Id,
                fecha: currentDirection.Fecha,
            })
        }

        setCalendarState((current) => ({
            ...current,
            Direcciones: current.Direcciones.map((direction) =>
                direction.Id === directionId ? { ...direction, EsEntregaActiva: isActive } : direction
            ),
        }))
    }

    const handleSaveDirection = async (updatedDirection: DireccionDto) => {
        const currentDirection = calendarState.Direcciones.find((item) => item.Id === updatedDirection.Id)

        if (!currentDirection) {
            throw new Error('No se encontro la direccion a actualizar')
        }

        await CalendarService.updateDireccion('', {
            calendarioId: calendarState.Id,
            fecha: updatedDirection.Fecha,
            nuevaDireccion: updatedDirection.Direccion,
            referencias: updatedDirection.Referencias,
            latitud: updatedDirection.Latitud,
            longitud: updatedDirection.Longitud,
        })

        setCalendarState((current) => ({
            ...current,
            Direcciones: current.Direcciones.map((direction) =>
                direction.Id === updatedDirection.Id ? updatedDirection : direction
            ),
        }))
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-sm tracking-wide text-slate-500">Detalle del calendario</p>
                    <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                        {patient.firstName} {patient.middleName} {patient.lastName}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">Paciente: {patient.documentNumber}</p>
                </div>

                <Link
                    href={`/calendar/${patient.patientId}`}
                    className="h-10 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
                >
                    Volver a calendarios
                </Link>
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <p className="text-slate-400">Calendario</p>
                        <p className="mt-1 text-slate-800">{calendarState.Id}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Plan alimenticio</p>
                        <p className="mt-1 text-slate-800">{calendarState.PlanAlimenticioId}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Estado</p>
                        <p className="mt-1 text-slate-800">{calendarState.Activo ? 'Activo' : 'Inactivo'}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Fecha inicio</p>
                        <p className="mt-1 text-slate-800">{new Date(calendarState.FechaInicio).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Fecha fin</p>
                        <p className="mt-1 text-slate-800">{new Date(calendarState.FechaFin).toLocaleDateString('es-ES')}</p>
                    </div>
                    <div>
                        <p className="text-slate-400">Porcentaje completado</p>
                        <p className="mt-1 text-slate-800">{calendarState.PorcentajeCompletado}%</p>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-between gap-3">
                <TitlePage title="Direcciones" />
                <button
                    type="button"
                    onClick={() => setIsCreateDirectionOpen(true)}
                    className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Crear dirección
                </button>
            </div>

            <GridContainer emptyMessage="No hay direcciones para mostrar">
                {calendarState.Direcciones.map((direction) => (
                    <CalendarDirectionCard
                        key={direction.Id}
                        direction={direction}
                        onSave={handleSaveDirection}
                        onToggleDelivery={handleToggleDelivery}
                    />
                ))}
            </GridContainer>

            <CalendarDirectionEditorModal
                isOpen={isCreateDirectionOpen}
                direction={initialDirectionForCreate}
                onClose={() => setIsCreateDirectionOpen(false)}
                onSave={async (newDirection) => {
                    const response = await CalendarService.createDireccion('', {
                        calendarioId: calendarState.Id,
                        fecha: newDirection.Fecha,
                        direccion: newDirection.Direccion,
                        referencias: newDirection.Referencias,
                        latitud: newDirection.Latitud,
                        longitud: newDirection.Longitud,
                    })

                    setCalendarState(response.data)
                    setIsCreateDirectionOpen(false)
                }}
                onToggleDelivery={async () => {
                    return
                }}
                allowDeliveryToggle={false}
                title="Crear dirección"
            />
        </div>
    )
}