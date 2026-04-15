export interface Evolution {
    evolutionId: string;
    historyId: string;
    description: string;
    observation: string;
    medicOrder: string;
}

export interface CreateEvolutionRequest {
    historyId: string;
    description: string;
    observation: string;
    medicOrder: string;
}