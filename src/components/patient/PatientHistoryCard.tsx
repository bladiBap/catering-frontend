import Link from 'next/link'

import { History } from '@/models/patient/histories/History'

interface PatientHistoryCardProps {
    patientId: string
    history: History
}

export function PatientHistoryCard({ patientId, history }: PatientHistoryCardProps) {
    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-slate-900">Historia Clinica</h2>
                <Link
                    href={`/patient/history/${patientId}/update/${history.historyId}`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                    Editar
                </Link>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 text-sm text-slate-700">
                <div>
                    <p className="text-slate-400">Motivo de la consulta</p>
                    <p>{history.reason}</p>
                </div>

                <div>
                    <p className="text-slate-400">Diagnostico</p>
                    <p>{history.diagnostic}</p>
                </div>

                <div>
                    <p className="text-slate-400">Tratamiento</p>
                    <p>{history.treatment}</p>
                </div>
            </div>
        </div>
    )
}
