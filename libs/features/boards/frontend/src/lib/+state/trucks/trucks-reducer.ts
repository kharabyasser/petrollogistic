import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Truck } from '../../domain/truck';

import * as TrucksActions from './trucks-actions';

export interface State extends EntityState<Truck> {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Truck> = createEntityAdapter<Truck>({});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  isLoaded: false,
  error: null,
});

export const trucksReducer = createReducer(
  initialState,
  on(TrucksActions.getTrucks, (state) => ({ ...state, isLoading: true })),
  on(TrucksActions.getTrucksSuccess, (state, action) =>
    adapter.addMany(action.data, {
      ...state,
      isLoading: false,
      isLoaded: true,
    })
  ),
  on(TrucksActions.onError, (state, action) => ({
    ...state, 
    isLoading: false, 
    isLoaded: false,
    error: action.error 
   })),
);
