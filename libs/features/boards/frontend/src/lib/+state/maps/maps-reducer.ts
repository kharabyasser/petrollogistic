import { createReducer, on } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';
import { MapMarker } from '../../models/maps/map-marker';

import * as MapsActions from './maps-actions';

export interface MapState {
  markersOnMap: MapMarker[];
  isochroneData: any;
  centerOnPosition: Coordinate | null;
}

export const initialState: MapState = {
  markersOnMap: [],
  centerOnPosition: null,
  isochroneData: null
};

export const mapsReducer = createReducer(
  initialState,
  on(MapsActions.setMarkersOnMap, (state, action) => ({
    ...state,
    markersOnMap: action.data
  })),
  on(MapsActions.setCenterOnPosition, (state, action) => ({
    ...state,
    centerOnPosition: action.data,
    fitMarkersBound: false
  })),
  on(MapsActions.setFitBounds, (state, action) => ({
    ...state,
    centerOnPosition: action.data ? null : state.centerOnPosition,
    fitMarkersBound: action.data
  })),
  on(MapsActions.setIsochronesData, (state, action) => ({
    ...state,
    isochroneData: action.data
  })),
  on(MapsActions.clear, (state) => ({
    ...state,
    markersOnMap: [],
    centerOnPosition: null,
    isochroneData: null,
  })),
);
