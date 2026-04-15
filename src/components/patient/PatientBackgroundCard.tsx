import Link from 'next/link'

import { Background } from '@/models/patient/histories/Background'

interface PatientBackgroundCardProps {
    patientId: string
    background: Background
}

export function PatientBackgroundCard({ patientId, background }: PatientBackgroundCardProps) {
    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">Antecedente</h3>
                <Link
                    href={`/patient/background/${patientId}/update/${background.historyId}`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                    Editar
                </Link>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-700">
                <div>
                    <p className="text-slate-400">Descripcion</p>
                    <p>{background.description}</p>
                </div>
            </div>
        </div>
    )
}
