import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { DeliveryRequestService } from "../services/deliveryrequest-service";

import * as RequestsActions from './delivery-requests-actions';

@Injectable()
export class DeliveryRequestsEffect {
    getRequests$ = createEffect(() =>
        this.actions$.pipe(ofType(RequestsActions.getDeliveryRequests),
            mergeMap(() => {
                return this.deliveryRequestService
                    .getDeliveryRequests()
                    .pipe(
                        map(request => RequestsActions.getDeliveryRequestsSuccess({ data: request })),
                        catchError(error => of(RequestsActions.getDeliveryRequestsFailure({ error: error.message }))));
            }))
    )

    constructor(private actions$: Actions, private deliveryRequestService: DeliveryRequestService) { }
}