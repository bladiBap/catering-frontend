import Link from 'next/link'

import { Patient } from '@/models/patient/patients/Patient'
import { History } from '@/models/patient/histories/History'
import { Evolution } from '@/models/patient/histories/Evolution'
import { Background } from '@/models/patient/histories/Background'
import { PatientInfo } from '@/components/patient/PatientInfo'
import { PatientHistoryCard } from '@/components/patient/PatientHistoryCard'
import { PatientEvolutionCard } from '@/components/patient/PatientEvolutionCard'
import { PatientBackgroundCard } from '@/components/patient/PatientBackgroundCard'

interface HistoryEditorScreenProps {
    patient: Patient
    existingHistory?: History
    evolutions?: Evolution[]
    backgrounds?: Background[]
}

export function HistoryEditorScreen({ patient, existingHistory, evolutions = [], backgrounds = [] }: HistoryEditorScreenProps) {
    return (
        <div className="flex flex-col gap-6">
            <PatientInfo patient={patient} />

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Historia Clinica</h2>
                    {!existingHistory && (
                        <Link
                            href={`/patient/history/${patient.patientId}/create`}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                            Crear Historia Clinica
                        </Link>
                    )}
                </div>

                {existingHistory ? (
                    <PatientHistoryCard patientId={patient.patientId} history={existingHistory} />
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        <p className="text-sm text-slate-600">No hay historia clinica registrada para este paciente.</p>
                    </div>
                )}
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Evoluciones</h2>
                    {existingHistory ? (
                        <Link
                            href={`/patient/evolution/${patient.patientId}`}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                            Crear Evolucion
                        </Link>
                    ) : (
                        <span className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-slate-500">
                            Crear Evolucion
                        </span>
                    )}
                </div>

                {existingHistory && evolutions.length > 0 ? (
                    <div className="space-y-4">
                        {evolutions.map((evolution) => (
                            <PatientEvolutionCard
                                key={evolution.evolutionId}
                                patientId={patient.patientId}
                                evolution={evolution}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        <p className="text-sm text-slate-600">No se encontraron evoluciones para este paciente.</p>
                    </div>
                )}
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Antecedentes</h2>
                    {existingHistory ? (
                        <Link
                            href={`/patient/background/${patient.patientId}`}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                            Crear Antecedente
                        </Link>
                    ) : (
                        <span className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-slate-500">
                            Crear Antecedente
                        </span>
                    )}
                </div>

                {existingHistory && backgrounds.length > 0 ? (
                    <div className="space-y-4">
                        {backgrounds.map((background) => (
                            <PatientBackgroundCard
                                key={background.backgroudId}
                                patientId={patient.patientId}
                                background={background}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                        <p className="text-sm text-slate-600">No se encontraron antecedentes para este paciente.</p>
                    </div>
                )}
            </section>
        </div>
    )
}
