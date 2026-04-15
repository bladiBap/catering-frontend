export interface Ingredient {
    id: string;
    calorias: number;
    nombre: string;
    cantidadValor: number;
    categoriaId: string;
    unidadId: number;
}

export interface CreateIngredientRequest {
    calorias: number;
    nombre: string;
    cantidadValor: number;
    categoriaId: string;
    unidadId: number;
}
