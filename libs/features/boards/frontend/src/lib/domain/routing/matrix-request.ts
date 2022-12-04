import { RoutingMetric } from "./enums/routing-metric";
import { RoutingUnit } from "./enums/routing-unit";

export interface MatrixRequest {
    locations: number[][2],
    matrics: RoutingMetric[],
    units: RoutingUnit
}