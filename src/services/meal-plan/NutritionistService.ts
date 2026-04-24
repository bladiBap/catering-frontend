import axios from '../axios/AxiosInstance';
import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';
import { CreateNutritionistRequest, Nutritionist } from '@/models/meal-plan/nutritionists/Nutritionist';

export class NutritionistService {
    static async getAll(token: string = '', pagination: Pagination): Promise<ApiResponse<Nutritionist[]>> {
        const response = await axios.get<ApiResponse<Nutritionist[]>>('/Nutricionista/GetAll', {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
            params: pagination,
        });

        return response.data;
    }

    static async create(
        token: string = '',
        nutritionist: CreateNutritionistRequest
    ): Promise<ApiResponse<Nutritionist>> {
        const response = await axios.post<ApiResponse<Nutritionist>>(
            '/Nutricionista/CreateNutricionista',
            {
                ...nutritionist,
                fechaCreacion: new Date().toISOString(),
            },
            token ? { headers: { Authorization: `Bearer ${token}` } } : {}
        );

        return response.data;
    }
}
