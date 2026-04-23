export enum StatusPackage {
    CREATED = 0,
    COMPLETED = 1,
}

export enum StatusPackageItem {
    CREATED = 0,
    COMPLETED = 1,
}

export interface MeasurementUnitPackageDTO {
    id: string
    name: string
    simbol: string
}

export interface IngredientPackageDTO {
    id: string
    name: string
    measurementUnit: MeasurementUnitPackageDTO
}

export interface RecipePackageDTO {
    id: string
    name: string
    instructions: string
    ingredients: IngredientPackageDTO[]
}

export interface PackageItemDTO {
    id: string
    quantity: number
    quantityPrepared?: number
    status: StatusPackageItem
    recipe: RecipePackageDTO
}

export interface PackageDTO {
    id: string
    dateOrdered: string
    dateCreatedOn: string
    status: StatusPackage
    packageItems: PackageItemDTO[]
}