import { createReducer, on } from '@ngrx/store';
import * as OptimizationActions from './optimization-actions';
import { Job } from '../../models/routing/vrp-request';
import { Product } from '../../domain/product';

export interface OptimizationState {
  optimizationJobs: Job[];
  optimizationProducts: Product[];
}

export const initialState: OptimizationState = {
  optimizationJobs: [],
  optimizationProducts: [],
};

export const optimizationReducer = createReducer(
  initialState,
  on(OptimizationActions.addOptimizationJob, (state, action) => ({
    ...state,
    optimizationJobs: [...state.optimizationJobs, action.data],
  })),
  on(OptimizationActions.removeOptimizationJob, (state, action) => ({
    ...state,
    optimizationJobs: state.optimizationJobs.filter(
      (job) => job.id !== action.data,
    ),
  })),
  on(OptimizationActions.setOptimizationProducts, (state, action) => ({
    ...state,
    optimizationProducts: action.data,
  })),
);
