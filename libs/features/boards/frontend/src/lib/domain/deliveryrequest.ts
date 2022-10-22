export interface DeliveryRequest {
    id: string;
    source: string,
    targetDate: Date,
    isUrgent: boolean,
    purchaseOrder: string,
    rank: number
}