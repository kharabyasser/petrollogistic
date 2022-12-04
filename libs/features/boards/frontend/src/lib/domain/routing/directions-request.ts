import { RoutingUnit } from "./enums/routing-unit";

export interface DirectionsRequest {
    coordinates: number[][2],
    unites: RoutingUnit
}