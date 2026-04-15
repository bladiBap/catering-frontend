import axios from '../axios/AxiosInstance';
import { CreateRecipeRequest, Recipe } from '@/models/meal-plan/recipe/Recipe';
import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';

export class RecipeService {
    
    static async getAll(token: string, pagination: Pagination): Promise<ApiResponse<Recipe[]>> {
        const response = await axios.get<ApiResponse<Recipe[]>>('/Recipe/GetAllRecipe', {
            headers: { Authorization: `Bearer ${token}` },
            params: pagination
        });
        
        return response.data;
    }

    static async create(token: string, recipe: CreateRecipeRequest): Promise<ApiResponse<Recipe>> {
        const response = await axios.post<ApiResponse<Recipe>>('/Recipe/CreateRecipe', recipe, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }

    static async update(token: string, recipe: Recipe): Promise<ApiResponse<Recipe>> {
        const response = await axios.put<ApiResponse<Recipe>>('/Recipe/UpdateRecipe', recipe, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    }
}