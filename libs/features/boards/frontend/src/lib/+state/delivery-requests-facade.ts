import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { requestsSelector, selectedDeliveriesSelector } from "./delivery-requests.selectors";
import * as RequestsActions from '../+state/delivery-requests-actions';
import { DeliveryRequest } from "../domain/deliveryrequest";
import { Observable } from "rxjs";

@Injectable()
export class DeliveryRequestsFacade {
    deliveryRequests$: Observable<DeliveryRequest[]>;
    selectedRequests$: Observable<string[]>;

    constructor(private store: Store) {
        this.deliveryRequests$ = this.store.pipe(select(requestsSelector));
        this.selectedRequests$ = this.store.pipe(select(selectedDeliveriesSelector))
    }

    loadDeliveryRequests() {
        this.store.dispatch(RequestsActions.getDeliveryRequests());
    }

    addSelectedRequest(request: string) {
        this.store.dispatch(RequestsActions.addSelectedDeliveryRequest({ data: request }))
    }

    removeSelectedRequest(request: string) {
        this.store.dispatch(RequestsActions.removeSelectedDeliveryRequest({ data: request }))
    }

    addAllRequestsToSelection() {
        this.store.dispatch(RequestsActions.toggleRequestsSelection({ data: true }))
    }

    removeAllRequestsFromSelection() {
        this.store.dispatch(RequestsActions.toggleRequestsSelection({ data: false }))
    }
}