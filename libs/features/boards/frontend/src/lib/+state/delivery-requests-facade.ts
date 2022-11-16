import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { requestsSelector } from "./delivery-requests.selectors";
import * as RequestsActions from '../+state/delivery-requests-actions';
import { DeliveryRequest } from "../domain/deliveryrequest";
import { Observable } from "rxjs";

@Injectable()
export class DeliveryRequestsFacade {
    deliveryRequests$: Observable<DeliveryRequest[]> = new Observable<DeliveryRequest[]>();

    constructor(private store: Store) {
        this.deliveryRequests$ = this.store.pipe(select(requestsSelector));
     }

    loadDeliveryRequests() {
        this.store.dispatch(RequestsActions.getDeliveryRequests());
    }
}