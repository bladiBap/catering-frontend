import axios from '../axios/AxiosInstance';

import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';
import { CreateDriverRequest, Driver, UpdateDriverRequest } from '@/models/delivery/drivers/Driver';

export class DriverService {
    static async getAll(token: string = '', pagination: Pagination): Promise<ApiResponse<Driver[]>> {
        const response = await axios.get<ApiResponse<Driver[]>>('/logistic/v1/drivers', {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
            params: pagination,
        });

        return response.data;
    }

    static async getById(token: string = '', id: string): Promise<ApiResponse<Driver>> {
        const response = await axios.get<ApiResponse<Driver>>('/logistic/v1/drivers/' + id, {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        });

        return response.data;
    }

    static async create(token: string = '', payload: CreateDriverRequest): Promise<ApiResponse<Driver>> {
        const response = await axios.post<ApiResponse<Driver>>('/logistic/v1/drivers', payload, token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : {});

        return response.data;
    }

    static async update(
        token: string = '',
        id: string,
        payload: UpdateDriverRequest,
    ): Promise<ApiResponse<Driver>> {
        const response = await axios.put<ApiResponse<Driver>>(
            '/logistic/v1/drivers/' + id,
            { id, ...payload },
            token ? { headers: { Authorization: `Bearer ${token}` } } : {},
        );
        console.log('Update Driver Response:', response);
        return response.data;
    }
}
