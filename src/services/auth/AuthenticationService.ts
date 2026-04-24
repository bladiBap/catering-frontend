import axios from '../axios/AxiosInstance';
import { ApiResponse } from '@/models/api/Response';
import { setAuthTokenCookie } from './AuthTokenCookie';

export class AuthenticationService {

    static async login(username: string, password: string): Promise<ApiResponse<string>> {
        const response = await axios.post<ApiResponse<string>>('/security/Authentications', { username, password });
        if (response.data.isSuccess && response.data.value) {
            setAuthTokenCookie(response.data.value);
        }

        return response.data;

        // setAuthTokenCookie('mocked-token');
        // return { isSuccess: true, message: 'Login successful', value: 'mocked-token' };
    }
}