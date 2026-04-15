import Link from 'next/link'

import { Evolution } from '@/models/patient/histories/Evolution'

interface PatientEvolutionCardProps {
    patientId: string
    evolution: Evolution
}

export function PatientEvolutionCard({ patientId, evolution }: PatientEvolutionCardProps) {
    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">Evolucion</h3>
                <Link
                    href={`/patient/evolution/${patientId}/update/${evolution.historyId}`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                    Editar
                </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 text-sm text-slate-700">
                <div>
                    <p className="text-slate-400">Descripcion</p>
                    <p>{evolution.description}</p>
                </div>

                <div>
                    <p className="text-slate-400">Observacion</p>
                    <p>{evolution.observation}</p>
                </div>

                <div>
                    <p className="text-slate-400">Orden Medica</p>
                    <p>{evolution.medicOrder}</p>
                </div>
            </div>
        </div>
    )
}
