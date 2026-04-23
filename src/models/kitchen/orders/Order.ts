export enum StatusOrder {
    CREATED = 0,
    COMPLETED = 1,
}

export enum StatusOrderItem {
    CREATED = 0,
    COMPLETED = 1,
}

export interface MeasurementUnitDTO {
    id: string
    name: string
    simbol: string
}

export interface IngredientDTO {
    id: string
    name: string
    measurementUnit: MeasurementUnitDTO
}

export interface RecipeDTO {
    id: string
    name: string
    instructions: string
    ingredients: IngredientDTO[]
}

export interface OrderItemDTO {
    id: string
    quantity: number
    quantityPrepared?: number
    status: StatusOrderItem
    recipe: RecipeDTO
}

export interface OrderDTO {
    id: string
    dateOrdered: string
    dateCreatedOn: string
    status: StatusOrder
    orderItems: OrderItemDTO[]
}
