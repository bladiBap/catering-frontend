export interface Nutritionist {
    id: string;
    nombre: string;
    fechaCreacion: string;
    activo: boolean;
}

export interface CreateNutritionistRequest {
    nombre: string;
    activo: boolean;
}
