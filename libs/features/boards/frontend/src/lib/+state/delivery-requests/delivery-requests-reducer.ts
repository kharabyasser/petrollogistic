import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { DeliveryRequest } from "../../domain/deliveryrequest";

import * as RequestsActions from './delivery-requests-actions';

export interface State extends EntityState<DeliveryRequest> {
    selectedDeliveries: string[];
    isLoading: boolean;
    isLoaded: boolean;
    error: string | null;
}

export const adapter : EntityAdapter<DeliveryRequest> = 
   createEntityAdapter<DeliveryRequest>({
   });

export const initialState: State = adapter.getInitialState({
    selectedDeliveries: [],
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
    on(RequestsActions.onError, (state, action) => ({
         ...state, 
         isLoading: false, 
         isLoaded: false,
         error: action.error 
        })),
    on(RequestsActions.addSelectedDeliveryRequest, (state, action) => ({
        ...state, 
        selectedDeliveries: [...state.selectedDeliveries, action.data]
    })),
    on(RequestsActions.removeSelectedDeliveryRequest, (state, action) => ({
        ...state, 
        selectedDeliveries: state.selectedDeliveries.filter(x => x != action.data)
    })),
    on(RequestsActions.toggleRequestsSelection, (state, action) => ({
        ...state, 
        selectedDeliveries: action.data ? Object.values(state.entities).map(x => x ? x.id : '') : []
    }))
);