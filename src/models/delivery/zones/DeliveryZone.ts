export interface DeliveryZone {
    id: string;
    code: string;
    name: string;
}

export interface DeliveryZoneBoundaryPoint {
    latitude: number;
    longitude: number;
}

export interface DeliveryZoneDetail extends DeliveryZone {
    driverId: string;
    boundaries: DeliveryZoneBoundaryPoint[];
}

export interface CreateDeliveryZoneRequest {
    driver_id: string;
    code: string;
    name: string;
    boundaries: DeliveryZoneBoundaryPoint[];
}

export interface UpdateDeliveryZoneRequest {
    driver_id: string;
    code: string;
    name: string;
    boundaries: DeliveryZoneBoundaryPoint[];
}
