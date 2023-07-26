import { Component, OnInit } from '@angular/core';
import { VrpService } from '../../../services/vrp-service';
import { Job, Vehicle } from '../../../models/routing/vrp-request';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { tap, switchMap, map } from 'rxjs';
import { RoutingService } from '../../../services/routing-service';
import { TrucksFacade } from '../../../+state/trucks/trucks-facade';
import { Feature, GeoJsonProperties, Point } from 'geojson';
import { VrpAssignment } from '../../../models/routing/vrp-assignment';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { QuickDispatchTruckComponent } from './truck/quick-dispatch.truck';
import {
  TicketSelectionMode,
  VrpRequestForm,
} from '../../../models/routing/vrp-request-form';
import { TrackMode } from '../../../models/routing/enums/track-mode';
import { CapacityMode } from '../../../models/routing/enums/capacity-mode';
import { DispatchStatus } from '../../../domain/enums/dispatch-status';
import { FormlyTypes } from '@petrologistic/core/frontend/formly';

@Component({
  selector: 'petrologistic-quick-dispatch',
  templateUrl: './quick-dispatch.component.html',
  styleUrls: ['./quick-dispatch.component.scss'],
})
export class QuickDispatchComponent implements OnInit {
  form = new FormGroup({});
  model: VrpRequestForm[];
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  optimizationStep: 'configuration' | 'result' | 'validation' = 'configuration';
  vrpResults: VrpAssignment | null = null;

  constructor(
    private vrpService: VrpService,
    private routingService: RoutingService,
    private mapsFacade: MapsFacade,
    private truckFacade: TrucksFacade,
  ) {
    this.model = [
      {
        truckName: 'Frontliner',
        truckNumber: 1234,
        ticketsCount: 2,
        isOptimize: true,
        truckConstraints: {
          trackMode: null
        },
        productsConstraints: {
          capacityMode: null,
          productsData: [
            {
              product: {
                id: '0',
                description: 'prod1',
                name: 'prod1',
                number: 123,
              },
              load: 1080,
            },
            {
              product: {
                id: '1',
                description: 'prod2',
                name: 'prod2',
                number: 456,
              },
              load: 720,
            },
          ],
        },
        ticketsConstraints: {
          selectionMode: TicketSelectionMode.All,
          ticketConstraintInputs: [
            {
              isOptimize: false,
              ticketNumber: 7845,
              demand: 500,
              productName: 'Clear Diesel',
              status: DispatchStatus.onTruck,
            },
            {
              isOptimize: true,
              ticketNumber: 8848,
              demand: 782,
              productName: 'Dyed Diesel',
              status: DispatchStatus.onTruck,
            },
          ],
        },
      },
      {
        truckName: 'Orange',
        truckNumber: 7784,
        ticketsCount: 14,
        isOptimize: false,
        truckConstraints: {
          trackMode: TrackMode.LAST_VISIT,
        },
        productsConstraints: {
          capacityMode: CapacityMode.CUSTOM,
          productsData: [
            {
              product: {
                id: '0',
                description: 'prod5',
                name: 'prod5',
                number: 447,
              },
              load: 2054,
            },
            {
              product: {
                id: '1',
                description: 'prod6',
                name: 'prod6',
                number: 889,
              },
              load: 240,
            },
          ],
        },
        ticketsConstraints: {
          selectionMode: TicketSelectionMode.All,
          ticketConstraintInputs: [
            {
              isOptimize: false,
              ticketNumber: 7845,
              demand: 500,
              productName: 'Clear Diesel',
              status: DispatchStatus.onTruck,
            },
            {
              isOptimize: true,
              ticketNumber: 8848,
              demand: 782,
              productName: 'Dyed Diesel',
              status: DispatchStatus.onTruck,
            },
          ],
        },
      },
    ];
  }

  ngOnInit(): void {
    this.setFields();
  }

  private setFields(): void {
    this.fields = [
      {
        fieldGroupClassName: 'quick_dispatch-form',
        fieldGroup: [
          this.setTruckSection()
        ],
      },
    ];
  }

  private setTruckSection(): FormlyFieldConfig {
    return {
      type: FormlyTypes.SIMPLE_REPEATING_SECTION,
      fieldArray: {
        fieldGroup: [
          {
            type: QuickDispatchTruckComponent,
          }
        ]
      }
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
                  const trucksForOptimization =
                    this.vrpResults?.vehicleRoutes.map((r) => r.vehicleId);
                  this.truckFacade.trucks$
                    .pipe(
                      map((trucks) =>
                        trucks
                          .filter(
                            (t) => trucksForOptimization?.includes(t.number),
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
                          }),
                      ),
                    )
                    .subscribe((f) => this.mapsFacade.addMarkers(f));
                });
              });
            });
        }),
      )
      .subscribe();
  }
}
