import axios from '../axios/AxiosInstance';
import { TypeFood } from '@/models/meal-plan/type-food/TypeFood';
import { ApiResponse } from '@/models/api/Response';

export class TypeFoodService {
    
    static async getAll(token: string): Promise<ApiResponse<TypeFood[]>> {
        const response = await axios.get<ApiResponse<TypeFood[]>>('/TipoAlimento/GetAll', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }
}
