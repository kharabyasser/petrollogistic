import { createAction, props } from '@ngrx/store';
import { Truck } from '../../domain/truck';

export const getTrucks = createAction('[Trucks] Get Trucks');
export const getTrucksSuccess = createAction(
  '[Trucks] Get Trucks Success',
  props<{ data: Truck[] }>()
);
export const onError = createAction(
  '[Trucks] Error',
  props<{ error: string }>()
);
