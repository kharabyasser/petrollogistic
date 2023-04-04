import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Coordinate } from "../../models/maps/coordinate";
import { MapMarker } from "../../models/maps/map-marker";
import { markersOnMapSelector, centerOnPositionSelector, isochroneDataSelector } from "./maps-selectors";

import * as MapActions from './maps-actions';
import { IsochronesResponse } from "../../models/routing/isochrones-response";

@Injectable()
export class MapsFacade {
    markersOnMap$: Observable<MapMarker[]>;
    centerOnPosition$: Observable<Coordinate | null>;
    isochroneData$: Observable<any>;

    constructor(private store: Store) {
        this.markersOnMap$ = 
        this.store.pipe(select(markersOnMapSelector));

        this.centerOnPosition$ = 
        this.store.pipe(select(centerOnPositionSelector));

        this.isochroneData$ = 
        this.store.pipe(select(isochroneDataSelector));
    }

    
    addMarkers(markers: MapMarker[]) {
        this.store.dispatch(MapActions.setMarkersOnMap({ data: markers }))
    }

    addIsochroneData(isochroneData: IsochronesResponse) {
        this.store.dispatch(MapActions.setIsochronesData({ data: isochroneData}));
    }

    centerOn(location: Coordinate) {
        this.store.dispatch(MapActions.setCenterOnPosition({ data: location }))
    }

    clear() {
        this.store.dispatch(MapActions.clear());
    }
}