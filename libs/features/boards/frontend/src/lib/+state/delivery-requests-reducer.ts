import { createReducer, on } from "@ngrx/store";
import { DeliveryRequest } from "../domain/deliveryrequest";

import * as RequestsActions from './delivery-requests-actions';

export interface State {
    deliveries: DeliveryRequest[];
    isLoading: boolean;
    isLoaded: boolean;
    error: string | null;
}

export const initialState: State = {
    deliveries: [],
    isLoading: false,
    isLoaded: false,
    error: null
};

export const reducers = createReducer(
    initialState, 
    on(RequestsActions.getDeliveryRequests, (state) => ({ ...state, isLoading: true })),
    on(RequestsActions.getDeliveryRequestsSuccess, (state, action) => ({
         ...state, 
         isLoading: false, 
         isLoaded: true,
         deliveries: action.data
        })),
    on(RequestsActions.getDeliveryRequestsFailure, (state, action) => ({
         ...state, 
         isLoading: false, 
         isLoaded: false,
         error: action.error 
        }))
);