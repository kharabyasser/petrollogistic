import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OptimizationState } from "./optimization-reducer";


export const selectState = createFeatureSelector<OptimizationState>('Optimization');

export const optimizationJobsSelector = createSelector(selectState, (state: OptimizationState) => state.optimizationJobs); 
export const optimizationProductsSelector = createSelector(selectState, (state: OptimizationState) => state.optimizationProducts); 