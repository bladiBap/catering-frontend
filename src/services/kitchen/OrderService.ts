import axios from '../axios/AxiosInstance'

import { ApiResponse } from '@/models/api/Response'
import { Pagination } from '@/models/api/request/Pagination'
import { OrderDTO } from '@/models/kitchen/orders/Order'

export interface AddPreparedQuantityRequest {
    orderId: string
    orderItemId: string
    preparedQuantity: number
}

export class OrderService {
    static async getAll(token: string, pagination: Pagination): Promise<ApiResponse<OrderDTO[]>> {
        const response = await axios.get<ApiResponse<OrderDTO[]>>('/Order/GetAllOrder', {
            headers: { Authorization: `Bearer ${token}` },
            params: pagination,
        })

        return response.data
    }

    static async getById(token: string, orderId: string): Promise<ApiResponse<OrderDTO>> {
        const response = await axios.get<ApiResponse<OrderDTO>>('/Order/GetById', {
            headers: { Authorization: `Bearer ${token}` },
            params: { orderId },
        })

        return response.data
    }

    static async addPreparedQuantity(
        token: string,
        request: AddPreparedQuantityRequest,
    ): Promise<ApiResponse<OrderDTO>> {
        const response = await axios.put<ApiResponse<OrderDTO>>('/Order/PrepareOrderItem', request, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return response.data
    }
}
