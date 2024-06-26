import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Coordinate } from '../../models/maps/coordinate';
import {
  markersOnMapSelector,
  centerOnPositionSelector,
  isochroneDataSelector,
  routesSelector,
} from './maps-selectors';

import * as MapActions from './maps-actions';
import { Feature, GeoJsonProperties, Point } from 'geojson';

@Injectable()
export class MapsFacade {
  markersOnMap$: Observable<Array<Feature<Point, GeoJsonProperties>>>;
  centerOnPosition$: Observable<Coordinate | null>;
  isochroneData$: Observable<GeoJSON.GeoJSON | null>;
  routes$: Observable<GeoJSON.GeoJSON[]>;

  constructor(private store: Store) {
    this.markersOnMap$ = this.store.pipe(select(markersOnMapSelector));

    this.centerOnPosition$ = this.store.pipe(select(centerOnPositionSelector));

    this.isochroneData$ = this.store.pipe(select(isochroneDataSelector));

    this.routes$ = this.store.pipe(select(routesSelector));
  }

  addMarkers(markers: Feature<Point, GeoJsonProperties>[]) {
    this.store.dispatch(MapActions.addMarkersOnMap({ data: markers }));
  }

  replaceMarkers(markers: Feature<Point, GeoJsonProperties>[]) {
    this.store.dispatch(MapActions.replaceMarkersOnMap({ data: markers }));
  }

  addIsochroneData(isochroneData: GeoJSON.GeoJSON) {
    this.store.dispatch(MapActions.addIsochronesData({ data: isochroneData }));
  }

  addRoute(routesData: GeoJSON.GeoJSON) {
    this.store.dispatch(MapActions.addRoute({ data: routesData }));
  }

  centerOn(location: Coordinate) {
    this.store.dispatch(MapActions.centerOnPosition({ data: location }));
  }

  clear() {
    this.store.dispatch(MapActions.clear());
  }
}
