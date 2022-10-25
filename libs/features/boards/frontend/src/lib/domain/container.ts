import { UnitOfMeasurement } from "./enums/unit-of-measurement";
import { Product } from "./product";

export interface Container {
    id: string,
    currentPercentage: number,
    product: Product,
    requestedAmount: number,
    requestedAmountUnit: UnitOfMeasurement
}