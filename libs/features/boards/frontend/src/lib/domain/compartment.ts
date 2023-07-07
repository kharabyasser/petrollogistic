import { Product } from "./product";

export interface Compartment {
    id: string,
    number: number,
    capacity: number,
    load: number,
    product: Product
}