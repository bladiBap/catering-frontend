import axios from '../axios/AxiosInstance';
import { UnitMeasurement } from '@/models/meal-plan/unit-measurement/UnitMeasurement';
import { ApiResponse } from '@/models/api/Response';

export class UnitMeasurementService {
    
    static async getAll(token: string): Promise<ApiResponse<UnitMeasurement[]>> {
        const response = await axios.get<ApiResponse<UnitMeasurement[]>>('/UnidadMedida/GetAll', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }
}
