import { BloodTypeChip } from './BloodTypeChip';
import { Patient } from '@/models/patient/patients/Patient';

interface PatientInfoProps {
    patient: Patient
}

export function PatientInfo({ patient }: PatientInfoProps) {

    return (
        <div className="container mx-auto">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm tracking-wide text-slate-500">Paciente</p>
                        <h1 className="mt-1 text-2xl font-semibold text-slate-900">
                            {patient.firstName} {patient.middleName} {patient.lastName}
                        </h1>
                    </div>
                    <BloodTypeChip bloodType={patient.bloodType} />
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 text-sm md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <p className="text-slate-400">Documento</p>
                        <p className="mt-1 text-slate-800">{patient.documentNumber}</p>
                    </div>

                    <div>
                        <p className="text-slate-400">Fecha de Nacimiento</p>
                        <p className="mt-1 text-slate-800">{patient.dateOfBirth.toLocaleDateString()}</p>
                    </div>

                    <div>
                        <p className="text-slate-400">Ocupacion</p>
                        <p className="mt-1 text-slate-800">{patient.ocupation}</p>
                    </div>

                    <div>
                        <p className="text-slate-400">Religion</p>
                        <p className="mt-1 text-slate-800">{patient.religion}</p>
                    </div>

                    <div className="md:col-span-2 lg:col-span-2">
                        <p className="text-slate-400">Alergias</p>
                        <p className="mt-1 text-slate-800">{patient.alergies}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}