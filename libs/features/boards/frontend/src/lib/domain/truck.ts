import { Compartment } from "./compartment"

export interface Truck {
    id: string,
    name: string,
    description: string,
    number: number,
    trucksLicense: string,
    trailersLicense: string,
    permit: string,
    longitude: number,
    latitude: number
    system: string,
    selected: boolean,
    compartments: Compartment[]
}