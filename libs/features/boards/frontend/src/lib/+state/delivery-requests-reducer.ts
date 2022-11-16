import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { DeliveryRequest } from "../domain/deliveryrequest";

import * as RequestsActions from './delivery-requests-actions';

export interface State extends EntityState<DeliveryRequest> {
    isLoading: boolean;
    isLoaded: boolean;
    error: string | null;
}

export const adapter : EntityAdapter<DeliveryRequest> = 
   createEntityAdapter<DeliveryRequest>({

   });

export const initialState: State = adapter.getInitialState({
    isLoading: false,
    isLoaded: false,
    error: null
});

export const reducers = createReducer(
    initialState, 
    on(RequestsActions.getDeliveryRequests, (state) => ({ ...state, isLoading: true })),
    on(RequestsActions.getDeliveryRequestsSuccess, (state, action) => adapter.addMany(action.data, {
         ...state, 
         isLoading: false, 
         isLoaded: true,
        })),
    on(RequestsActions.getDeliveryRequestsFailure, (state, action) => ({
         ...state, 
         isLoading: false, 
         isLoaded: false,
         error: action.error 
        }))
);