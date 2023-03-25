import { Coordinate } from "./coordinate";
import { MapMarker } from "./map-marker";

export class MapState {
    markersOnMap: MapMarker[] = [];
    centerOn: Coordinate | undefined;
    isochroneData: unknown;
}