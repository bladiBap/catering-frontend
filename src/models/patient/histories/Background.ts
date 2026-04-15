export interface Background {
    backgroudId: string;
    historyId: string;
    description: string;
}

export interface CreateBackgroundRequest {
    historyId: string;
    description: string;
}