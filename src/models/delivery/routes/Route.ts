export interface DeliveryRoute {
    id: string;
    status: number;
    startedAt: string;
    completedAt: string;
    createdAt: string;
}

export interface RouteLocation {
    latitude: number;
    longitude: number;
}

export interface DeliveryRouteStop {
    id: string;
    deliverySequence: number;
    status: number;
    deliveryLocation: RouteLocation;
}

export interface DeliveryRouteDetail extends DeliveryRoute {
    batchId: string;
    deliveryZoneId: string;
    driverId: string;
    originLocation: RouteLocation;
    stops: DeliveryRouteStop[];
}