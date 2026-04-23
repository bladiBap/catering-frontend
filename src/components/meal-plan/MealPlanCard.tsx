import { MealPlan } from '@/models/meal-plan/meal-plan/MealPlan'

interface MealPlanCardProps {
    mealPlan: MealPlan
}

export function MealPlanCard({ mealPlan }: MealPlanCardProps) {
    return (
        <article className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Plan alimenticio</h2>
                    <p className="mt-1 text-sm text-slate-500">ID: {mealPlan.id}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {mealPlan.dietas.length} dietas
                </span>
            </div>

            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p>
                    <span className="text-slate-400">Paciente:</span> {mealPlan.pacienteId}
                </p>
                <p>
                    <span className="text-slate-400">Nutricionista:</span> {mealPlan.nutricionistaId}
                </p>
                <p>
                    <span className="text-slate-400">Inicio:</span>{' '}
                    {new Date(mealPlan.fechaInicio).toLocaleString('es-ES')}
                </p>
                <p>
                    <span className="text-slate-400">Duracion:</span> {mealPlan.duracionDias} dias
                </p>
            </div>
        </article>
    )
}