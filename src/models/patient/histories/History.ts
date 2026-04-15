export interface History {
    historyId: string;
    patientId: string;
    foodPlanId: string;
    reason: string;
    diagnostic: string;
    treatment: string;
}

export interface CreateHistoryRequest {
    patientId: string;
    foodPlanId: string;
    reason: string;
    diagnostic: string;
    treatment: string;
}