import { createReducer, on } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';

import * as MapsActions from './maps-actions';
import { Job, Vehicle } from '../../models/routing/vrp-request';
import { Feature, GeoJsonProperties, Point } from 'geojson';

export interface MapState {
  markersOnMap: Array<Feature<Point, GeoJsonProperties>>;
  isochroneData: GeoJSON.GeoJSON | null;
  routes: GeoJSON.GeoJSON[];
  centerOnPosition: Coordinate | null;
  optimizationVehicules: Vehicle[];
  optimizationJobs: Job[];
}

export const initialState: MapState = {
  markersOnMap: [],
  centerOnPosition: null,
  isochroneData: null,
  routes: [],
  optimizationVehicules: [],
  optimizationJobs: []
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
  on(MapsActions.addOptimizationVehicule, (state, action) => ({
    ...state,
    optimizationVehicules: [...state.optimizationVehicules, action.data],
  })),
  on(MapsActions.removeOptimizationVehicule, (state, action) => ({
    ...state,
    optimizationVehicules: state.optimizationVehicules.filter((job) => job.id !== action.data),
  })),
  on(MapsActions.addOptimizationJob, (state, action) => ({
    ...state,
    optimizationJobs: [...state.optimizationJobs, action.data],
  })),
  on(MapsActions.removeOptimizationJob, (state, action) => ({
    ...state,
    optimizationJobs: state.optimizationJobs.filter((job) => job.id !== action.data),
  })),
  on(MapsActions.clear, (state) => ({
    ...state,
    markersOnMap: [],
    centerOnPosition: null,
    isochroneData: null,
  })),
);
