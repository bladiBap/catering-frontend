 'use client'

import { useState } from 'react'

import { DireccionDto } from '@/models/calendar/calendario/Calendario'
import { CalendarDirectionEditorModal } from '@/components/calendar/CalendarDirectionEditorModal'

interface CalendarDirectionCardProps {
    direction: DireccionDto
    onSave: (direction: DireccionDto) => Promise<void>
    onToggleDelivery: (directionId: string, isActive: boolean) => Promise<void>
}

export function CalendarDirectionCard({
    direction,
    onSave,
    onToggleDelivery,
}: CalendarDirectionCardProps) {
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    const handleSave = async (updatedDirection: DireccionDto) => {
        await onSave(updatedDirection)
        setIsEditorOpen(false)
    }

    const handleToggleDelivery = async (isActive: boolean) => {
        await onToggleDelivery(direction.Id, isActive)
    }

    return (
        <>
        <article className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-semibold text-slate-900">{direction.Direccion}</h3>
                    <p className="mt-1 text-sm text-slate-500">Fecha: {new Date(direction.Fecha).toLocaleDateString('es-ES')}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            direction.EsEntregaActiva ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                        }`}
                    >
                        {direction.EsEntregaActiva ? 'Entrega activa' : 'Entrega inactiva'}
                    </span>

                    <button
                        type="button"
                        onClick={() => setIsEditorOpen(true)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Editar dirección
                    </button>
                </div>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p>
                    <span className="text-slate-400">Referencias:</span> {direction.Referencias}
                </p>
                <p>
                    <span className="text-slate-400">Latitud:</span> {direction.Latitud}
                </p>
                <p>
                    <span className="text-slate-400">Longitud:</span> {direction.Longitud}
                </p>
                <p>
                    <span className="text-slate-400">Dias restantes:</span> {direction.DiasRestantes}
                </p>
            </div>
        </article>
        <CalendarDirectionEditorModal
            isOpen={isEditorOpen}
            direction={direction}
            onClose={() => setIsEditorOpen(false)}
            onSave={handleSave}
            onToggleDelivery={handleToggleDelivery}
        />
        </>
    )
}