import { Patient } from '@/models/patient/Patient'
import { BloodType } from '@/enums/patient/BloodType'

import { PatientCard } from '@/components/patient/PatientCard'
import { TitlePage } from '@/components/page/TitlePage'

export const MOCK_PATIENTS: Patient[] = [
    {
        firstName: 'Alejandro',
        middleName: 'José',
        lastName: 'García',
        bloodType: BloodType.AB_NEGATIVE, // O "A+" según tu enum
        documentNumber: '1029384756',
        dateOfBirth: new Date(1985, 4, 12),
        ocupation: 'Ingeniero de Software',
        religion: 'Católico',
        alergies: 'Penicilina, Polen',
    },
    {
        firstName: 'Mariana',
        middleName: 'Elena',
        lastName: 'Rodríguez',
        bloodType: BloodType.O_POSITIVE, // O "O+" según tu enum
        documentNumber: '9876543210',
        dateOfBirth: new Date(1992, 10, 25),
        ocupation: 'Diseñadora Gráfica',
        religion: 'Ninguna',
        alergies: 'Nueces, Mariscos',
    },
    {
        firstName: 'Roberto',
        middleName: 'Carlos',
        lastName: 'Méndez',
        bloodType: BloodType.B_NEGATIVE,
        documentNumber: '4561237890',
        dateOfBirth: new Date(1978, 1, 5),
        ocupation: 'Arquitecto',
        religion: 'Evangélico',
        alergies: 'Ninguna',
    },
]

export async function PatientListScreen() {
    return (
        <>
            <TitlePage title="Lista de Pacientes" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_PATIENTS.map((patient, index) => (
                    <PatientCard key={index} patient={patient} />
                ))}
            </div>
        </>
    )
}