import { createAction, props } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';
import { MapMarker } from '../../models/maps/map-marker';

export const setMarkersOnMap = createAction(
  '[Map] Set Markers On Map',
  props<{ data: MapMarker[] }>()
);

export const setCenterOnPosition = createAction(
  '[Map] Set Center On Position',
  props<{ data: Coordinate }>()
);

export const setFitBounds = createAction(
  '[Map] Set FitBounds',
  props<{ data: boolean }>()
);

export const setIsochronesData = createAction(
  '[Map] Set Isochrones Data',
  props<{ data: unknown }>()
);

export const clear = createAction(
  '[Map] Clear');