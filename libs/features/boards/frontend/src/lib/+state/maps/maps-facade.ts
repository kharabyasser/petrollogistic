import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Coordinate } from "../../models/maps/coordinate";
import { MapMarker } from "../../models/maps/map-marker";
import { markersOnMapSelector, centerOnPositionSelector, isochroneDataSelector, fitMarkersBoundSelector } from "./maps-selectors";

import * as MapActions from './maps-actions';

@Injectable()
export class MapsFacade {
    markersOnMap$: Observable<MapMarker[]>;
    fitMarkersBound$: Observable<boolean>;
    centerOnPosition$: Observable<Coordinate | null>;
    isochroneData$: Observable<any>;

    constructor(private store: Store) {
        this.markersOnMap$ = 
        this.store.pipe(select(markersOnMapSelector));

        this.fitMarkersBound$ = 
        this.store.pipe(select(fitMarkersBoundSelector))

        this.centerOnPosition$ = 
        this.store.pipe(select(centerOnPositionSelector));

        this.isochroneData$ = 
        this.store.pipe(select(isochroneDataSelector));
    }

    
    addMarkers(markers: MapMarker[]) {
        this.store.dispatch(MapActions.setMarkersOnMap({ data: markers }))
    }
}