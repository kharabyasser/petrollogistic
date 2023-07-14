import { Product } from "../../domain/product";
import { Coordinate } from "../maps/coordinate";
import { CapacityMode } from "./enums/capacity-mode";
import { TrackMode } from "./enums/track-mode";

export class VrpRequestForm { 
    truckConstraints?: TruckConstraint;
    productsConstraints?: ProductConstraint;
}

export class TruckConstraint {
    trackMode: TrackMode = TrackMode.ROUND_TRIP;
    startLocation?: Coordinate;
    endLocation?: Coordinate;
}

export class ProductConstraint {
    capacityMode: CapacityMode = CapacityMode.TRUCK_LOAD;
    productsData?: ProductConstraintData[];
}

export class ProductConstraintData {
    product?: Product;
    load: number = 0;
}