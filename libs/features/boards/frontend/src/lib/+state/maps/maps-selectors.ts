import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MapState } from "./maps-reducer";


export const selectState = createFeatureSelector<MapState>('Maps');

export const markersOnMapSelector = createSelector(selectState, (state: MapState) => state.markersOnMap); 
export const centerOnPositionSelector = createSelector(selectState, (state: MapState) => state.centerOnPosition); 
export const isochroneDataSelector = createSelector(selectState, (state: MapState) => state.isochroneData); 