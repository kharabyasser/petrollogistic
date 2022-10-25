import { AccountType } from "./enums/account-type";
import { Address } from "./models/address";

export interface Account {
    id: string,
    name: string,
    phoneNumber: string,
    address: Address,
    accountType: AccountType
}