import { BloodType } from '@/enums/patient/BloodType'
import { Patient } from '@/models/patient/patients/Patient'
import { TitlePage } from '@/components/page/TitlePage'
import { PatientHistoryItem } from '@/components/patient/PatientHistoryItem'

export const MOCK_PATIENTS_FOR_HISTORY: Patient[] = [
    {
        patientId: '1',
        firstName: 'Alejandro',
        middleName: 'Jose',
        lastName: 'Garcia',
        bloodType: BloodType.AB_NEGATIVE,
        documentNumber: '1029384756',
        dateOfBirth: new Date(1985, 4, 12),
        ocupation: 'Ingeniero de Software',
        religion: 'Catolico',
        alergies: 'Penicilina, Polen',
    },
    {
        patientId: '2',
        firstName: 'Mariana',
        middleName: 'Elena',
        lastName: 'Rodriguez',
        bloodType: BloodType.O_POSITIVE,
        documentNumber: '9876543210',
        dateOfBirth: new Date(1992, 10, 25),
        ocupation: 'Disenadora Grafica',
        religion: 'Ninguna',
        alergies: 'Nueces, Mariscos',
    },
    {
        patientId: '3',
        firstName: 'Roberto',
        middleName: 'Carlos',
        lastName: 'Mendez',
        bloodType: BloodType.B_NEGATIVE,
        documentNumber: '4561237890',
        dateOfBirth: new Date(1978, 1, 5),
        ocupation: 'Arquitecto',
        religion: 'Evangelico',
        alergies: 'Ninguna',
    },
]

export async function PatientHistoryListScreen() {
    return (
        <>
            <TitlePage title="Historia Clinica" />
            <div className="mt-4 space-y-3">
                {MOCK_PATIENTS_FOR_HISTORY.map((patient) => (
                    <PatientHistoryItem key={patient.patientId} patient={patient} />
                ))}
            </div>
        </>
    )
}