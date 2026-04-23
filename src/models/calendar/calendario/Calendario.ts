export interface DireccionDto {
    Id: string
    Fecha: string
    Direccion: string
    Referencias: string
    Latitud: number
    Longitud: number
    EsEntregaActiva: boolean
    DiasRestantes: number
}

export interface CalendarioDto {
    Id: string
    PacienteId: string
    PlanAlimenticioId: string
    FechaInicio: string
    FechaFin: string
    Activo: boolean
    PorcentajeCompletado: number
    Direcciones: DireccionDto[]
}