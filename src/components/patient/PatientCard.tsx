import { Patient } from '@/models/patient/Patient'
import { BloodTypeChip } from './BloodTypeChip'

export function PatientCard({ patient }: { patient: Patient }) {
    return (
        <div className="max-w-md bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
                {patient.firstName} {patient.middleName} {patient.lastName}
            </h2>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">
                        Tipo de Sangre:
                    </span>
                    <BloodTypeChip bloodType={patient.bloodType} />
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">
                        Documento:
                    </span>
                    <span>{patient.documentNumber}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">
                        Fecha de Nacimiento:
                    </span>
                    <span>
                        {new Date(patient.dateOfBirth).toLocaleDateString(
                            'es-ES'
                        )}
                    </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">
                        Ocupación:
                    </span>
                    <span>{patient.ocupation}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold text-gray-600">
                        Religión:
                    </span>
                    <span>{patient.religion}</span>
                </div>

                <div className="border-b pb-2">
                    <span className="font-semibold text-gray-600 block mb-1">
                        Alergias:
                    </span>
                    <span className="text-red-600">{patient.alergies}</span>
                </div>
            </div>
        </div>
    )
}
