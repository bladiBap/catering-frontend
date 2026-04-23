import axios from '../axios/AxiosInstance'

import { ApiResponse } from '@/models/api/Response'
import { CalendarioDto } from '@/models/calendar/calendario/Calendario'

export interface CreateDireccionRequest {
    calendarioId: string
    fecha: string
    direccion: string
    referencias: string
    latitud: number
    longitud: number
}

export interface UpdateDireccionRequest {
    calendarioId: string
    fecha: string
    nuevaDireccion: string
    referencias: string
    latitud: number
    longitud: number
}

export interface MarcarEntregaRequest {
    calendarioId: string
    fecha: string
}

export class CalendarService {
    static async getByPatient(token: string, patientId: string): Promise<ApiResponse<CalendarioDto[]>> {
        const response = await axios.get<ApiResponse<CalendarioDto[]>>('/Calendario/GetByPaciente', {
            headers: { Authorization: `Bearer ${token}` },
            params: { pacienteId: patientId },
        })

        return response.data
    }

    static async getById(token: string, calendarId: string): Promise<ApiResponse<CalendarioDto>> {
        const response = await axios.get<ApiResponse<CalendarioDto>>('/Calendario/GetById', {
            headers: { Authorization: `Bearer ${token}` },
            params: { calendarioId: calendarId },
        })

        return response.data
    }

    static async createDireccion(
        token: string,
        request: CreateDireccionRequest,
    ): Promise<ApiResponse<CalendarioDto>> {
        const response = await axios.post<ApiResponse<CalendarioDto>>('/Calendario/CreateDireccion', request, {
            headers: { Authorization: `Bearer ${token}` },
        })

        return response.data
    }

    static async updateDireccion(
        token: string,
        request: UpdateDireccionRequest,
    ): Promise<ApiResponse<CalendarioDto>> {
        const { calendarioId, ...body } = request

        const response = await axios.put<ApiResponse<CalendarioDto>>(
            `/Calendario/${calendarioId}/modificar-direccion`,
            body,
            {
            headers: { Authorization: `Bearer ${token}` },
            },
        )

        return response.data
    }

    static async marcarComoNoEntrega(
        token: string,
        request: MarcarEntregaRequest,
    ): Promise<ApiResponse<CalendarioDto>> {
        const response = await axios.post<ApiResponse<CalendarioDto>>(
            `/Calendario/${request.calendarioId}/marcar-no-entrega`,
            request,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        )

        return response.data
    }

    static async marcarComoEntrega(
        token: string,
        request: MarcarEntregaRequest,
    ): Promise<ApiResponse<CalendarioDto>> {
        const response = await axios.post<ApiResponse<CalendarioDto>>(
            `/Calendario/${request.calendarioId}/marcar-entrega`,
            request,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        )

        return response.data
    }
}