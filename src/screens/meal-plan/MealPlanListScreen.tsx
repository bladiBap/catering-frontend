import Link from 'next/link'

import { TitlePage } from '@/components/page/TitlePage'
import { GridContainer } from '@/components/shared/ContainerGrid'
import { MealPlanCard } from '@/components/meal-plan/MealPlanCard'
import { MealPlan } from '@/models/meal-plan/meal-plan/MealPlan'
import { Patient } from '@/models/patient/patients/Patient'

interface MealPlanListScreenProps {
    patient: Patient
    mealPlans: MealPlan[]
}

export function MealPlanListScreen({ patient, mealPlans }: MealPlanListScreenProps) {
    return (
        <>
            <div className="mb-4 flex flex-row items-start justify-between gap-3">
                <TitlePage title="Listado de planes alimenticios" />

                <Link
                    href={`/meal-plan/${patient.id}/create`}
                    className="h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Crear Plan
                </Link>
            </div>

            <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                <p className="font-medium text-slate-800">Paciente</p>
                <p className="mt-1">
                    {patient.firstName} {patient.middleName} {patient.lastName}
                </p>
                <p className="text-slate-500">CI: {patient.documentNumber}</p>
            </div>

            <GridContainer emptyMessage="No hay planes alimenticios para mostrar">
                {mealPlans.map((mealPlan) => (
                    <MealPlanCard key={mealPlan.id} mealPlan={mealPlan} />
                ))}
            </GridContainer>
        </>
    )
}