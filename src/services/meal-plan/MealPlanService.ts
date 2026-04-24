import axios from '../axios/AxiosInstance';
import { ApiResponse } from '@/models/api/Response';
import { CreateMealPlanRequest, MealPlan } from '@/models/meal-plan/meal-plan/MealPlan';

export class MealPlanService {
    static async create(token: string = '', mealPlan: CreateMealPlanRequest): Promise<ApiResponse<MealPlan>> {
        const response = await axios.post<ApiResponse<MealPlan>>('/PlanAlimenticio/CreatePlanAlimenticio', mealPlan, {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        });

        return response.data;
    }

    static async getByPatient(token: string = '', pacienteId: string): Promise<ApiResponse<MealPlan[]>> {
        const response = await axios.post<ApiResponse<MealPlan[]>>('/PlanAlimentario/BuscarPlanAlimentarioByPaciente', {
            pacienteId,
            ignorarFiltroFecha: true,
        }, {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
            params: { pacienteId },
        });

        return response.data;
    }

    static async getById(token: string = '', pacienteId: string): Promise<ApiResponse<MealPlan[]>> {
        return this.getByPatient(token, pacienteId);
    }
}
