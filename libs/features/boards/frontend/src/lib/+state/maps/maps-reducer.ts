import { createReducer, on } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';

import * as MapsActions from './maps-actions';
import { Feature, GeoJsonProperties, Point } from 'geojson';

export interface MapState {
  markersOnMap: Array<Feature<Point, GeoJsonProperties>>;
  isochroneData: GeoJSON.GeoJSON | null;
  routes: GeoJSON.GeoJSON[];
  centerOnPosition: Coordinate | null;
}

export const initialState: MapState = {
  markersOnMap: [],
  centerOnPosition: null,
  isochroneData: null,
  routes: []
};

export const mapsReducer = createReducer(
  initialState,
  on(MapsActions.addMarkersOnMap, (state, action) => ({
    ...state,
    markersOnMap: state.markersOnMap?.concat(action.data),
  })),
  on(MapsActions.replaceMarkersOnMap, (state, action) => ({
    ...state,
    markersOnMap: action.data,
  })),
  on(MapsActions.centerOnPosition, (state, action) => ({
    ...state,
    centerOnPosition: action.data,
    fitMarkersBound: false
  })),
  on(MapsActions.fitBounds, (state, action) => ({
    ...state,
    centerOnPosition: action.data ? null : state.centerOnPosition,
    fitMarkersBound: action.data
  })),
  on(MapsActions.addIsochronesData, (state, action) => ({
    ...state,
    isochroneData: action.data
  })),
  on(MapsActions.addRoute, (state, action) => ({
    ...state,
    routes: [...state.routes, action.data],
  })),
  on(MapsActions.clear, (state) => ({
    ...state,
    markersOnMap: [],
    centerOnPosition: null,
    isochroneData: null,
  })),
);
