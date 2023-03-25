import { createReducer, on } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';
import { MapMarker } from '../../models/maps/map-marker';

import * as MapsActions from './maps-actions';

export interface MapState {
  markersOnMap: MapMarker[];
  centerOn: Coordinate | undefined;
  isochroneData: unknown;
}

export const initialState: MapState = {
  markersOnMap: [],
  centerOn: undefined,
  isochroneData: null,
};

export const mapsReducer = createReducer(
  initialState,
  on(MapsActions.setMarkersOnMap, (state, action) => ({
    ...state,
    action,
  })),
  on(MapsActions.setCenteralPosition, (state, action) => ({
    ...state,
    action,
  })),
  on(MapsActions.setIsochronesData, (state, action) => ({
    ...state,
    action,
  })),
);
