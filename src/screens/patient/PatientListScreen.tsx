import Link from 'next/link'
import { Patient } from '@/models/patient/patients/Patient'
import { BloodType } from '@/enums/patient/BloodType'

import { PatientCard } from '@/components/patient/PatientCard'
import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'

export const MOCK_PATIENTS: Patient[] = [
    {
        patientId: '1',
        firstName: 'Alejandro',
        middleName: 'José',
        lastName: 'García',
        bloodType: BloodType.AB_NEGATIVE,
        documentNumber: '1029384756',
        dateOfBirth: new Date(1985, 4, 12),
        ocupation: 'Ingeniero de Software',
        religion: 'Católico',
        alergies: 'Penicilina, Polen',
    },
    {
        patientId: '2',
        firstName: 'Mariana',
        middleName: 'Elena',
        lastName: 'Rodríguez',
        bloodType: BloodType.O_POSITIVE,
        documentNumber: '9876543210',
        dateOfBirth: new Date(1992, 10, 25),
        ocupation: 'Diseñadora Gráfica',
        religion: 'Ninguna',
        alergies: 'Nueces, Mariscos',
    },
    {
        patientId: '3',
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
            <div className='mb-4 flex flex-row justify-between'>
                <TitlePage title="Lista de Pacientes" />
                <Link href="/patient/create" className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors h-10'>
                    Crear Paciente
                </Link>
            </div>
            <GridContainer>
                {MOCK_PATIENTS.map((patient, index) => (
                    <PatientCard key={index} patient={patient} />
                ))}
            </GridContainer>
        </>
    )
}