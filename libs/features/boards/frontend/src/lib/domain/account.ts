import { AccountType } from "./enums/account-type";
import { Address } from "../models/maps/address";

export interface Account {
    id: string,
    name: string,
    accountNumber: number,
    phoneNumber: string,
    address: Address,
    accountType: AccountType,
    latitude: number,
    longitude: number
}