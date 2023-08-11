import { createAction, props } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';
import { Job, Vehicle } from '../../models/routing/vrp-request';
import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';

export const addMarkersOnMap = createAction(
  '[Map] Add Markers On Map',
  props<{ data: Array<Feature<Point, GeoJsonProperties>> }>()
);

export const replaceMarkersOnMap = createAction(
  '[Map] Replace Markers On Map',
  props<{ data: Array<Feature<Point, GeoJsonProperties>> }>()
);

export const centerOnPosition = createAction(
  '[Map] Center On Position',
  props<{ data: Coordinate }>()
);

export const fitBounds = createAction(
  '[Map] FitBounds',
  props<{ data: boolean }>()
);

export const addIsochronesData = createAction(
  '[Map] Set Isochrones Data',
  props<{ data: GeoJSON.GeoJSON }>()
);

export const addRoute = createAction(
  '[Map] Add Route',
  props<{ data: GeoJSON.GeoJSON }>()
);

export const addOptimizationJob = createAction(
  '[Map] Add Optimization Jobs',
  props<{ data: Job }>()
);

export const removeOptimizationJob = createAction(
  '[Map] Remove Optimization Jobs',
  props<{ data: number }>()
);

export const clear = createAction(
  '[Map] Clear');