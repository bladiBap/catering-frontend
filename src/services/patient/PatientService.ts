import axios from '../axios/AxiosInstance';
import { CreatePatientRequest, Patient } from '@/models/patient/patients/Patient';
import { ApiResponse } from '@/models/api/Response';
import { Pagination } from '@/models/api/request/Pagination';
import { Contact, CreateContactRequest } from '@/models/patient/patients/Contact';

export class PatientService {
    
    static async getById(token: string, patientId: string): Promise<ApiResponse<Patient>> {
        const response = await axios.get<ApiResponse<Patient>>(`/patient/patients/getById`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { patientId }
        });
        return response.data;
    }

    static async getAll(token: string, pagination: Pagination): Promise<ApiResponse<Patient>> {
        const response = await axios.get<ApiResponse<Patient>>('/patient/patients/getList', {
            headers: { Authorization: `Bearer ${token}` },
            params: pagination
        });
        
        return response.data;
    }
    
    static async create(token: string, patient: CreatePatientRequest): Promise<ApiResponse<Patient>> {
        const response = await axios.post<ApiResponse<Patient>>('/patient/patients', patient, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        return response.data;
    }

    static async update(token: string, patient: Patient): Promise<ApiResponse<Patient>> {
        const response = await axios.put<ApiResponse<Patient>>(`/patient/patients`, patient, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    }

    static async createContact(token: string, contact: CreateContactRequest): Promise<ApiResponse<Contact>> {
        const response = await axios.post<ApiResponse<Contact>>('/patient/patients/contacts', contact, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async updateContact(token: string, contact: Contact): Promise<ApiResponse<Contact>> {
        const response = await axios.put<ApiResponse<Contact>>(`/patient/patients/contacts`, contact, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }

    static async deleteContact(token: string, contactId: string, patientId: string): Promise<ApiResponse<void>> {
        const response = await axios.delete<ApiResponse<void>>(`/patient/patients/contacts`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { ContactId: contactId, PatientId: patientId }
        });
        return response.data;
    }
}