import Link from 'next/link'
import { Patient } from '@/models/patient/patients/Patient'
import { BloodTypeChip } from './BloodTypeChip'

export function PatientCard({ patient }: { patient: Patient }) {
    return (
        <Link
            href={`/patient/${patient.id}`}
            className="w-full rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        {patient.firstName} {patient.middleName} {patient.lastName}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">CI: {patient.documentNumber}</p>
                </div>
                <BloodTypeChip bloodType={patient.bloodType} />
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-2">
                <p>
                    <span className="text-slate-400">Nacimiento:</span>{' '}
                    {new Date(patient.dateOfBirth).toLocaleDateString('es-ES')}
                </p>
                <p>
                    <span className="text-slate-400">Ocupacion:</span> {patient.ocupation}
                </p>
                <p>
                    <span className="text-slate-400">Religion:</span> {patient.religion}
                </p>
                <p className="truncate">
                    <span className="text-slate-400">Alergias:</span> {patient.alergies}
                </p>
            </div>
        </Link>
    )
}
