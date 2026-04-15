export interface RecipeIngredient {
    id: string;
    cantidadValor: number;
}

export interface Recipe {
    id: string;
    nombre: string;
    ingredienteList: RecipeIngredient[];
    tiempoId: number;
    instrucciones: string;
}

export interface CreateRecipeRequest {
    nombre: string;
    ingredienteList: RecipeIngredient[];
    tiempoId: number;
    instrucciones: string;
}