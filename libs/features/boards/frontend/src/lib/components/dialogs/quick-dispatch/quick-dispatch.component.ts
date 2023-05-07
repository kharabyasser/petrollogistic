import { Component } from '@angular/core';
import { VrpService } from '../../../services/vrp-service';
import { Job, Vehicle } from '../../../models/routing/vrp-request';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { VrpResult } from '../../../models/routing/vrp-result';
import { tap, switchMap, map, filter } from 'rxjs';
import { RoutingService } from '../../../services/routing-service';
import { TrucksFacade } from '../../../+state/trucks/trucks-facade';
import { Feature, GeoJsonProperties, Point } from 'geojson';

@Component({
  selector: 'petrologistic-quick-dispatch',
  templateUrl: './quick-dispatch.component.html',
  styleUrls: ['./quick-dispatch.component.scss'],
})
export class QuickDispatchComponent {
  optimizationStep: 'configuration' | 'result' | 'validation' = 'configuration';
  vrpResults: VrpResult | null = null;

  constructor(
    private vrpService: VrpService,
    private routingService: RoutingService,
    private mapsFacade: MapsFacade,
    private truckFacade: TrucksFacade
  ) {}

  optimizeVrp() {
    let trucks: Vehicle[];
    let deliveries: Job[];

    this.optimizationStep = 'result';

    this.mapsFacade.optimizationTrucks$
      .pipe(
        tap((vehicles) => (trucks = vehicles)),
        switchMap(() => this.mapsFacade.optimizationJobs$),
        tap((jobs) => (deliveries = jobs)),
        map(() => {
          this.vrpService
            .optimize({
              vehicles: trucks,
              jobs: deliveries,
            })
            .subscribe((x) => {
              this.vrpResults = x;

              this.vrpResults.routes.forEach((r) => {
                const directionResult = this.routingService.getDirections({
                  coordinates: r.steps.map((s) => s.location),
                });
                directionResult.subscribe((d) => {
                  this.mapsFacade.addRoute(d);
                  const trucksForOptimization = this.vrpResults?.routes.map((r) => r.vehicle);
                  this.truckFacade.trucks$.pipe(
                    map((trucks) =>
                      trucks.filter(t => trucksForOptimization?.includes(t.number))
                      .map((t) => {
                        const features: Feature<Point, GeoJsonProperties> = {
                          type: 'Feature',
                          properties: {
                            tag: 'truck',
                            symbol: t.number.toString(),
                          },
                          geometry: {
                            type: 'Point',
                            coordinates: [t.longtitude, t.latitude],
                          },
                        };
                        return features;
                      })
                    )
                  ).subscribe(f => this.mapsFacade.addMarkers(f));
                });
              });
            });
        })
      )
      .subscribe();
  }
}
