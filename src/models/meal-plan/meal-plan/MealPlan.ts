export interface MealPlanRecipeRequest {
    orden: number;
    tiempoId: number;
    recetaId: string;
}

export interface MealPlanDietRequest {
    fecha: string;
    recetas: MealPlanRecipeRequest[];
}

export interface CreateMealPlanRequest {
    pacienteId: string;
    nutricionistaId: string;
    dietas: MealPlanDietRequest[];
    fechaInicio: string;
    duracionDias: number;
}

export interface MealPlan extends CreateMealPlanRequest {
    id: string;
}
