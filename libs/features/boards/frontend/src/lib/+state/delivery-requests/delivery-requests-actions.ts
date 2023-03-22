import { createAction, props } from '@ngrx/store';
import { DeliveryRequest } from '../../domain/deliveryrequest';

export const getDeliveryRequests = createAction(
  '[DeliveryRequests] Get DeliveryRequests'
);
export const getDeliveryRequestsSuccess = createAction(
  '[DeliveryRequests] Get DeliveryRequests Success',
  props<{ data: DeliveryRequest[] }>()
);
export const addSelectedDeliveryRequest = createAction(
  '[DeliveryRequests] Add DeliveryRequest Selection',
  props<{ data: string }>()
);
export const removeSelectedDeliveryRequest = createAction(
  '[DeliveryRequests] Remove DeliveryRequest Selection',
  props<{ data: string }>()
);
export const toggleRequestsSelection = createAction(
  '[DeliveryRequests] Toggle DeliveryRequests Selection',
  props<{ data: boolean }>()
);
export const onError = createAction(
  '[DeliveryRequests] Error',
  props<{ error: string }>()
);
