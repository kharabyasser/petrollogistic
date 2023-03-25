import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Coordinate } from "../../models/maps/coordinate";
import { MapMarker } from "../../models/maps/map-marker";
import { markerOnMap, centralPosition, isochroneData } from "./maps-selectors";

export class MapsFacade {
    markerOnMap$: Observable<MapMarker[]>;
    centralPosition$: Observable<Coordinate | undefined>;
    isochroneData$: Observable<any>;

    constructor(private store: Store) {
        this.markerOnMap$ = 
        this.store.pipe(select(markerOnMap));

        this.centralPosition$ = 
        this.store.pipe(select(centralPosition));

        this.isochroneData$ = 
        this.store.pipe(select(isochroneData));
    }
}