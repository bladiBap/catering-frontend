export interface List<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}