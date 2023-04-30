import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Coordinate } from '../../models/maps/coordinate';
import { MapMarker } from '../../models/maps/map-marker';
import {
  markersOnMapSelector,
  centerOnPositionSelector,
  isochroneDataSelector,
  optimizationVehiculeSelector,
  optimizationJobsSelector,
  routesSelector,
} from './maps-selectors';

import * as MapActions from './maps-actions';
import { Job, Vehicle } from '../../models/routing/vrp-request';
import { GeoJsonResponse } from '../../models/routing/geojson-response';

@Injectable()
export class MapsFacade {
  markersOnMap$: Observable<MapMarker[]>;
  centerOnPosition$: Observable<Coordinate | null>;
  isochroneData$: Observable<GeoJsonResponse | null>;
  routes$: Observable<GeoJsonResponse[]>;
  optimizationTrucks$: Observable<Vehicle[]>;
  optimizationJobs$: Observable<Job[]>;

  constructor(private store: Store) {
    this.markersOnMap$ = this.store.pipe(select(markersOnMapSelector));

    this.centerOnPosition$ = this.store.pipe(select(centerOnPositionSelector));

    this.isochroneData$ = this.store.pipe(select(isochroneDataSelector));

    this.routes$ = this.store.pipe(select(routesSelector));

    this.optimizationTrucks$ = this.store.pipe(select(optimizationVehiculeSelector));

    this.optimizationJobs$ = this.store.pipe(select(optimizationJobsSelector));
  }

  addMarkers(markers: MapMarker[]) {
    this.store.dispatch(MapActions.addMarkersOnMap({ data: markers }));
  }

  addIsochroneData(isochroneData: GeoJsonResponse) {
    this.store.dispatch(MapActions.addIsochronesData({ data: isochroneData }));
  }

  addRoute(routesData: GeoJsonResponse) {
    this.store.dispatch(MapActions.addRoute({ data: routesData }));
  }

  addOptimizationVehicule(vehicule: Vehicle) {
    this.store.dispatch(
      MapActions.addOptimizationVehicule({ data: vehicule })
    );
  }

  addOptimizationJob(job: Job) {
    this.store.dispatch(MapActions.addOptimizationJob({ data: job }));
  }

  removeOptimizationVehicule(vehiculeId: number) {
    this.store.dispatch(
      MapActions.removeOptimizationVehicule({ data: vehiculeId })
    );
  }

  removeOptimizationJob(jobId: number) {
    this.store.dispatch(MapActions.removeOptimizationJob({ data: jobId }));
  }

  centerOn(location: Coordinate) {
    this.store.dispatch(MapActions.centerOnPosition({ data: location }));
  }

  clear() {
    this.store.dispatch(MapActions.clear());
  }
}
