import { createAction, props } from "@ngrx/store";
import { DeliveryRequest } from "../domain/deliveryrequest";

export const getDeliveryRequests = createAction('[DeliveryRequests] Get DeliveryRequests');
export const getDeliveryRequestsSuccess = createAction('[DeliveryRequests] Get DeliveryRequests Success',
    props<{ data: DeliveryRequest[] }>());
export const getDeliveryRequestsFailure = createAction('[DeliveryRequests] Get DeliveryRequests Failure',
    props<{ error: string }>());