import axios from '../axios/AxiosInstance';
import { ApiResponse } from '@/models/api/Response';
import { CreateMealPlanRequest, MealPlan } from '@/models/meal-plan/meal-plan/MealPlan';

export class MealPlanService {
    static async create(token: string, mealPlan: CreateMealPlanRequest): Promise<ApiResponse<MealPlan>> {
        const response = await axios.post<ApiResponse<MealPlan>>('/PlanAlimenticio/CreatePlanAlimenticio', mealPlan, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    }

    static async getByPatient(token: string, pacienteId: string): Promise<ApiResponse<MealPlan[]>> {
        const response = await axios.get<ApiResponse<MealPlan[]>>('/PlanAlimenticio/GetByPaciente', {
            headers: { Authorization: `Bearer ${token}` },
            params: { pacienteId },
        });

        return response.data;
    }
}
