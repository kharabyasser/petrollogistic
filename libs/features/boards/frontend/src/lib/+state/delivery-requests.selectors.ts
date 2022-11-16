import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, State } from "./delivery-requests-reducer";

export const selectState = createFeatureSelector<State>('DeliveryRequests');

export const selector = adapter.getSelectors();

export const requestsSelector = createSelector(selectState, selector.selectAll); 
export const isLoadingSelector = createSelector(selectState, (state: State) => state.isLoading); 
export const isLoadedSelector = createSelector(selectState, (state: State) => state.isLoaded); 
export const errorSelector = createSelector(selectState, (state: State) => state.error); 