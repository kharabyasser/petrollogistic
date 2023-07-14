import { Component, OnInit } from '@angular/core';
import { VrpService } from '../../../services/vrp-service';
import { Job, Vehicle, VrpRequestDto } from '../../../models/routing/vrp-request';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { tap, switchMap, map } from 'rxjs';
import { RoutingService } from '../../../services/routing-service';
import { TrucksFacade } from '../../../+state/trucks/trucks-facade';
import { Feature, GeoJsonProperties, Point } from 'geojson';
import { VrpAssignment } from '../../../models/routing/vrp-assignment';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TruckConstraintFormComponent } from './truck/constraints/truck-constraints/truck-constraint-form.component';
import { QuickDispatchTruckComponent } from './truck/quick-dispatch.truck';

@Component({
  selector: 'petrologistic-quick-dispatch',
  templateUrl: './quick-dispatch.component.html',
  styleUrls: ['./quick-dispatch.component.scss'],
})
export class QuickDispatchComponent implements OnInit {
  form = new FormGroup({});
  model: VrpRequestDto | null = null; // TODO: remove | null
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  optimizationStep: 'configuration' | 'result' | 'validation' = 'configuration';
  vrpResults: VrpAssignment | null = null;

  constructor(
    private vrpService: VrpService,
    private routingService: RoutingService,
    private mapsFacade: MapsFacade,
    private truckFacade: TrucksFacade
  ) {
  }
  ngOnInit(): void {
    this.setFields();
  }

  private setFields(): void {
    this.fields = [{
      fieldGroupClassName: 'quick_dispatch',
      fieldGroup: [
        this.setTruckSection(),
      ]
    }];
  }

  private setTruckSection(): FormlyFieldConfig {
    return {
      type: QuickDispatchTruckComponent,
    };
  }

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
              jobs: deliveries,
              vehicles: trucks,
            })
            .subscribe((x) => {
              this.vrpResults = x;

              this.vrpResults.vehicleRoutes.forEach((r) => {
                const directionResult = this.routingService.getDirections({
                  coordinates: r.visits.map((s) => [
                    s.nodeLocation.longitude,
                    s.nodeLocation.latitude,
                  ]),
                });
                directionResult.subscribe((d) => {
                  this.mapsFacade.addRoute(d);
                  const trucksForOptimization = this.vrpResults?.vehicleRoutes.map(
                    (r) => r.vehicleId
                  );
                  this.truckFacade.trucks$
                    .pipe(
                      map((trucks) =>
                        trucks
                          .filter((t) =>
                            trucksForOptimization?.includes(t.number)
                          )
                          .map((t) => {
                            const features: Feature<Point, GeoJsonProperties> =
                              {
                                type: 'Feature',
                                properties: {
                                  tag: 'truck',
                                  symbol: t.number.toString(),
                                },
                                geometry: {
                                  type: 'Point',
                                  coordinates: [t.longitude, t.latitude],
                                },
                              };
                            return features;
                          })
                      )
                    )
                    .subscribe((f) => this.mapsFacade.addMarkers(f));
                });
              });
            });
        })
      )
      .subscribe();
  }
}
