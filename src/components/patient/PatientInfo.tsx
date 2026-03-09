import { BloodTypeChip } from './BloodTypeChip';
import { Patient } from '@/models/patient/Patient';

interface PatientInfoProps {
    patient: Patient
}

export function PatientInfo({ patient }: PatientInfoProps) {

    return (
        <div className="min-h-screen container mx-auto">    
            <h1 className="text-2xl font-bold mb-4">Información del Paciente</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-xl font-semibold mb-2">
                    {patient.firstName} {patient.middleName} {patient.lastName}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                        <strong>Tipo de Sangre</strong>
                        <BloodTypeChip bloodType={patient.bloodType} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <strong>Documento</strong> 
                        <p>{patient.documentNumber}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <strong>Fecha de Nacimiento</strong>
                        <p>{patient.dateOfBirth.toLocaleDateString()}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <strong>Ocupación</strong>
                        <p>{patient.ocupation}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <strong>Religión</strong>
                        <p>{patient.religion}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <strong>Alergias</strong>
                        <p>{patient.alergies}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}