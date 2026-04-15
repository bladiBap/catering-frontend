import { CreateHistoryRequest, History } from '@/models/patient/histories/History';
import axios from '../axios/AxiosInstance';
import { ApiResponse } from '@/models/api/Response';
import { Background, CreateBackgroundRequest } from '@/models/patient/histories/Background';
import { CreateEvolutionRequest, Evolution } from '@/models/patient/histories/Evolution';

export class HistoryService {
    
    static async getById (token: string, historyId: string): Promise<ApiResponse<History>> {
        const response = await axios.get<ApiResponse<History>>(`/patient/histories/getById`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { HistoryId: historyId }
        });
        return response.data;
    }

    static async create(token: string, history: CreateHistoryRequest): Promise<ApiResponse<History>> {
        const response = await axios.post<ApiResponse<History>>('/patient/histories', history, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async update(token: string, history: History): Promise<ApiResponse<History>> {
        const response = await axios.put<ApiResponse<History>>(`/patient/histories`, history, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async createBackground(token: string, background: CreateBackgroundRequest): Promise<ApiResponse<Background>> {
        const response = await axios.post<ApiResponse<Background>>('/patient/histories/backgrouds', background, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async updateBackground(token: string, background: Background): Promise<ApiResponse<Background>> {
        const response = await axios.put<ApiResponse<Background>>(`/patient/histories/backgrouds`, background, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async createEvolution(token: string, evolution: CreateEvolutionRequest): Promise<ApiResponse<Evolution>> {
        const response = await axios.post<ApiResponse<Evolution>>('/patient/histories/evolutions', evolution, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async updateEvolution(token: string, evolution: Evolution): Promise<ApiResponse<Evolution>> {
        const response = await axios.put<ApiResponse<Evolution>>(`/patient/histories/evolutions`, evolution, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
}