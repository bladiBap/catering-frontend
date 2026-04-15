import axios from '../axios/AxiosInstance';
import { Category } from '@/models/meal-plan/categories/Category';
import { ApiResponse } from '@/models/api/Response';

export class CategoryService {
    
    static async getAll(token: string): Promise<ApiResponse<Category[]>> {
        const response = await axios.get<ApiResponse<Category[]>>('/Categoria/GetAll', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }
}