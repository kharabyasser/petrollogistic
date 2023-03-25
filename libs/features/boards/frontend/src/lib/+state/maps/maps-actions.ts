import { createAction, props } from '@ngrx/store';
import { Coordinate } from '../../models/maps/coordinate';
import { MapMarker } from '../../models/maps/map-marker';

export const setMarkersOnMap = createAction(
  '[Map] Set Markers On Map',
  props<{ data: MapMarker[] }>()
);

export const setCenteralPosition = createAction(
  '[Map] Set Centeral Position',
  props<{ data: Coordinate }>()
);

export const setIsochronesData = createAction(
  '[Map] Set Isochrones Data',
  props<{ data: unknown }>()
);
