import axios from '../axios/AxiosInstance';
import { Patient } from '@/models/patient/Patient';
import { ApiResponse } from '@/models/api/Response';

export class PatientService {

    static async getPatients(token: string): Promise<ApiResponse<Patient>> {
        return new Promise(async (resolve, reject) => {
            axios.get('/patients', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    const { data } = response;
                    resolve(data);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}