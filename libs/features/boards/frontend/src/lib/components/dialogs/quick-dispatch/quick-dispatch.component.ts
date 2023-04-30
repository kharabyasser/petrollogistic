import { Component } from '@angular/core';
import { VrpService } from '../../../services/vrp-service';
import { Job, Vehicle } from '../../../models/routing/vrp-request';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { VrpResult } from '../../../models/routing/vrp-result';
import { tap, switchMap, map } from 'rxjs';
import { RoutingService } from '../../../services/routing-service';

@Component({
  selector: 'petrologistic-quick-dispatch',
  templateUrl: './quick-dispatch.component.html',
  styleUrls: ['./quick-dispatch.component.scss'],
})
export class QuickDispatchComponent {
  optimizationLevel = 'configuration';
  vrpResults: VrpResult | null = null;

  constructor(
    private vrpService: VrpService,
    private routingService: RoutingService,
    private mapsFacade: MapsFacade
  ) {}

  optimizeVrp() {
    let trucks: Vehicle[];
    let deliveries: Job[];

    this.optimizationLevel = 'result';

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
                directionResult.subscribe((d) => this.mapsFacade.addRoute(d));
              });
            });
        })
      )
      .subscribe();
  }
}
