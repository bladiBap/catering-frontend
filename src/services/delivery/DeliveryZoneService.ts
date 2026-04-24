import axios from '../axios/AxiosInstance';

import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';
import {
    CreateDeliveryZoneRequest,
    DeliveryZone,
    DeliveryZoneDetail,
    UpdateDeliveryZoneRequest,
} from '@/models/delivery/zones/DeliveryZone';

export class DeliveryZoneService {
    static async getAll(token: string = '', pagination: Pagination): Promise<ApiResponse<DeliveryZone[]>> {
        const response = await axios.get<ApiResponse<DeliveryZone[]>>('/logistic/v1/delivery-zones', {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
            params: pagination,
        });

        return response.data;
    }

    static async getById(token: string = '', id: string): Promise<ApiResponse<DeliveryZoneDetail>> {
        const response = await axios.get<ApiResponse<DeliveryZoneDetail>>(`/logistic/v1/delivery-zones/${id}`, {
            ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
        });

        return response.data;
    }

    static async create(
        token: string = '',
        payload: CreateDeliveryZoneRequest,
    ): Promise<ApiResponse<DeliveryZoneDetail>> {
        const response = await axios.post<ApiResponse<DeliveryZoneDetail>>(
            '/logistic/v1/delivery-zones',
            payload,
            token ? { headers: { Authorization: `Bearer ${token}` } } : {},
        );

        return response.data;
    }

    static async update(
        token: string = '',
        id: string,
        payload: UpdateDeliveryZoneRequest,
    ): Promise<ApiResponse<DeliveryZoneDetail>> {
        const response = await axios.put<ApiResponse<DeliveryZoneDetail>>(
            `/logistic/v1/delivery-zones/${id}`,
            payload,
            token ? { headers: { Authorization: `Bearer ${token}` } } : {},
        );

        return response.data;
    }
}
