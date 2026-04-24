import axios, { AxiosHeaders } from 'axios';
import { getAuthTokenCookie } from '../auth/AuthTokenCookie';

const axiosInstance = axios.create({
    baseURL: 'http://167.71.109.119:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = getAuthTokenCookie();
    console.log('Attaching token to request:', token);
    if (!token) {
        return config;
    }
    const headers = AxiosHeaders.from(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;

    return config;
});

export default axiosInstance;