import axios from '../axios/AxiosInstance';

import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';
import { DeliveryRoute, DeliveryRouteDetail } from '@/models/delivery/routes/Route';

export class RouteService {
    static async getAll(
        token: string = '',
        pagination: Pagination,
    ): Promise<ApiResponse<DeliveryRoute[]> | DeliveryRoute[]> {
        const response = await axios.get<ApiResponse<DeliveryRoute[]> | DeliveryRoute[]>('/logistic/v1/routes', {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
            params: pagination,
        });

        return response.data;
    }

    static async getById(
        token: string = '',
        id: string,
    ): Promise<ApiResponse<DeliveryRouteDetail> | DeliveryRouteDetail> {
        const response = await axios.get<ApiResponse<DeliveryRouteDetail> | DeliveryRouteDetail>(`/logistic/v1/routes/${id}`, {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        });

        return response.data;
    }
}