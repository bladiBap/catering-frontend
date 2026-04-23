import axios from '../axios/AxiosInstance'

import { ApiResponse } from '@/models/api/Response'
import { Pagination } from '@/models/api/request/Pagination'
import { PackageDTO } from '@/models/kitchen/packages/Package'

export interface AddPreparedPackageQuantityRequest {
    packageId: string
    packageItemId: string
    preparedQuantity: number
}

export class PackageService {
    static async getAll(token: string, pagination: Pagination): Promise<ApiResponse<PackageDTO[]>> {
        const response = await axios.get<ApiResponse<PackageDTO[]>>('/Package/GetAllPackage', {
            headers: { Authorization: `Bearer ${token}` },
            params: pagination,
        })

        return response.data
    }

    static async getById(token: string, packageId: string): Promise<ApiResponse<PackageDTO>> {
        const response = await axios.get<ApiResponse<PackageDTO>>('/Package/GetById', {
            headers: { Authorization: `Bearer ${token}` },
            params: { packageId },
        })

        return response.data
    }

    static async addPreparedQuantity(
        token: string,
        request: AddPreparedPackageQuantityRequest,
    ): Promise<ApiResponse<PackageDTO>> {
        const response = await axios.put<ApiResponse<PackageDTO>>('/Package/PreparePackageItem', request, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return response.data
    }
}