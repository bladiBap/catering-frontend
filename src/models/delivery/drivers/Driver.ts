export interface Driver {
    id: string;
    fullName: string;
    isActive: boolean;
    status: number;
}

export interface CreateDriverRequest {
    full_name: string;
}

export interface UpdateDriverRequest {
    full_name: string;
    is_active: boolean;
}
