import axios from '../axios/AxiosInstance';
import { CreateIngredientRequest, Ingredient } from '@/models/meal-plan/ingredients/Ingredient';
import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';

export class IngredientService {
    
    static async getAll(token: string, pagination: Pagination): Promise<ApiResponse<Ingredient[]>> {
        const response = await axios.get<ApiResponse<Ingredient[]>>('/Ingrediente/GetAllIngrediente', {
            headers: { Authorization: `Bearer ${token}` },
            params: pagination
        });
        
        return response.data;
    }

    static async create(token: string, ingredient: CreateIngredientRequest): Promise<ApiResponse<Ingredient>> {
        const response = await axios.post<ApiResponse<Ingredient>>('/Ingrediente/CreateIngrediente', ingredient, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }

    static async update(token: string, ingredient: Ingredient): Promise<ApiResponse<Ingredient>> {
        const response = await axios.put<ApiResponse<Ingredient>>('/Ingrediente/UpdateIngrediente', ingredient, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }

    static async delete(token: string, ingredientId: string): Promise<ApiResponse<Ingredient>> {
        const response = await axios.delete<ApiResponse<Ingredient>>('/Ingrediente/DeleteIngrediente', {
            headers: { Authorization: `Bearer ${token}` },
            params: { ingredientId }
        });
        
        return response.data;
    }
}