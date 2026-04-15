import axios from '../axios/AxiosInstance';
import { Course } from '@/models/meal-plan/course/Course';
import { ApiResponse } from '@/models/api/Response';

export class CourseService {
    
    static async getAll(token: string): Promise<ApiResponse<Course[]>> {
        const response = await axios.get<ApiResponse<Course[]>>('/Tiempo/GetAll', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }
}
