import { RoutingMetric } from "./enums/routing-metric";
import { RoutingUnit } from "./enums/routing-unit";

export interface MatrixRequest {
    locations: number[][],
    metrics: RoutingMetric[],
    units: RoutingUnit
}