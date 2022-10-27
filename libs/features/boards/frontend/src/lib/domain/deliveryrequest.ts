import { Account } from "./account";
import { Container } from "./container";
import { DispatchStatus } from "./enums/dispatch-status";
import { Truck } from "./truck";

export interface DeliveryRequest {
    id: string,
    tags: string[],
    purchaseOrder: string,
    shipToAccount: Account,
    destinationContainers: Container[];
    creationDate: Date,
    targetDate: Date,
    rank: number,
    dispatchStatus: DispatchStatus,
    dispatchedToTruck: Truck,
    dispatchDate: Date
}