import { Coordinate } from "../maps/coordinate";

  export interface VrpAssignment {
    vehicleRoutes: VehicleRoute[];
    totalDistance: number;
    totalLoads: number[];
    objective: number;
    droppedOrders?: number[];
    droppedReloads?: number[];
  }

  export interface VehicleRoute {
    vehicleId: number;
    visits: Visit[];
    totalRouteDistance: number;
    totalRouteLoads: number[];
  }

  export interface Visit {
    order: number;
    nodeIndex: number;
    nodeId: number;
    nodeLocation: Coordinate;
    loadsOnVisit: number[];
  }