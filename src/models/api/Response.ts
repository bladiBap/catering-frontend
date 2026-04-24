export interface ApiResponse<T> {
    isSuccess: boolean;
    message: string;
    value: T;
}