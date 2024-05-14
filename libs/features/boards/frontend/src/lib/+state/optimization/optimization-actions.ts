import { createAction, props } from '@ngrx/store';
import { Job } from '../../models/routing/vrp-request';
import { Product } from '../../domain/product';

export const addOptimizationJob = createAction(
  '[Map] Add Optimization Jobs',
  props<{ data: Job }>(),
);

export const removeOptimizationJob = createAction(
  '[Map] Remove Optimization Jobs',
  props<{ data: number }>(),
);

export const setOptimizationProducts = createAction(
  '[Map] Set Optimization Products',
  props<{ data: Product[] }>(),
);
