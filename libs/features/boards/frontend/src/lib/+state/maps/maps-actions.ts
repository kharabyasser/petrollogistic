import { createAction, props } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';
import { MapMarker } from '../../models/maps/map-marker';
import { Job, Vehicle } from '../../models/routing/vrp-request';
import { GeoJsonResponse } from '../../models/routing/geojson-response';

export const addMarkersOnMap = createAction(
  '[Map] Add Markers On Map',
  props<{ data: MapMarker[] }>()
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
  props<{ data: GeoJsonResponse }>()
);

export const addRoute = createAction(
  '[Map] Add Route',
  props<{ data: GeoJsonResponse }>()
);

export const addOptimizationVehicule = createAction(
  '[Map] Add Optimization Vehicule',
  props<{ data: Vehicle }>()
);

export const removeOptimizationVehicule = createAction(
  '[Map] Remove Optimization Vehicule',
  props<{ data: number }>()
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