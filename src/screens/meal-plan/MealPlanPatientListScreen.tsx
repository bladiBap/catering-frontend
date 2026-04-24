import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { MealPlanPatientCard } from '@/components/meal-plan/MealPlanPatientCard'
import { Patient } from '@/models/patient/patients/Patient'

interface MealPlanPatientListScreenProps {
    patients: Patient[]
}

export function MealPlanPatientListScreen({ patients }: MealPlanPatientListScreenProps) {
    return (
        <>
            <div className="flex flex-row justify-between gap-3">
                <TitlePage title="Planes alimenticios" />
            </div>

            <GridContainer emptyMessage="No hay pacientes para mostrar">
                {patients.map((patient) => (
                    <MealPlanPatientCard key={patient.id} patient={patient} />
                ))}
            </GridContainer>
        </>
    )
}