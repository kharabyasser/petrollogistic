import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MapState } from "../../models/maps/map-state";

export const selectState = createFeatureSelector<MapState>('Maps');

export const markerOnMap = createSelector(selectState, (state: MapState) => state.markersOnMap); 
export const centralPosition = createSelector(selectState, (state: MapState) => state.centerOn); 
export const isochroneData = createSelector(selectState, (state: MapState) => state.isochroneData); 