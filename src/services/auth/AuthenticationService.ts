import axios from '../axios/AxiosInstance';
import { ApiResponse } from '@/models/api/Response';

export class AuthenticationService {

    static async login(email: string, password: string): Promise<ApiResponse<any>> {
        return new Promise(async (resolve, reject) => {
            axios.post('/auth/login', { email, password })
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