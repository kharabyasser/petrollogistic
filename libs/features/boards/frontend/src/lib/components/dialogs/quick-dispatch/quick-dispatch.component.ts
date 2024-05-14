import { Component, OnInit } from '@angular/core';
import { VrpService } from '../../../services/vrp-service';
import { Job } from '../../../models/routing/vrp-request';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { RoutingService } from '../../../services/routing-service';
import { TrucksFacade } from '../../../+state/trucks/trucks-facade';
import { Feature, GeoJsonProperties, Point } from 'geojson';
import { VrpAssignment } from '../../../models/routing/vrp-assignment';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { QuickDispatchTruckComponent } from './truck/quick-dispatch.truck';
import {
  KnownLocation,
  VrpRequestForm,
} from '../../../models/routing/vrp-request-form';
import { FormlyTypes } from '@petrologistic/core/frontend/formly';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TrackMode } from '../../../models/routing/enums/track-mode';
import { map, tap } from 'rxjs';
import { Truck } from '../../../domain/truck';
import { Coordinate } from '../../../models/maps/coordinate';
import { Product } from '../../../domain/product';
import { OptimizationFacade } from '../../../+state/optimization/optimization-facade';
import { DeliveryRequestsFacade } from '../../../+state/delivery-requests/delivery-requests-facade';

@UntilDestroy()
@Component({
  selector: 'petrologistic-quick-dispatch',
  templateUrl: './quick-dispatch.component.html',
  styleUrls: ['./quick-dispatch.component.scss'],
})
export class QuickDispatchComponent implements OnInit {
  form = new FormGroup({});
  model: VrpRequestForm[] = [];
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];

  optimizationJobs: Job[] = [];
  optimizationProds: Product[] = [];

  optimizationStep: 'configuration' | 'result' | 'validation' = 'configuration';
  vrpResults: VrpAssignment | null = null;

  trucks: Truck[] = [];

  constructor(
    private vrpService: VrpService,
    private routingService: RoutingService,
    private mapsFacade: MapsFacade,
    private optimizationFacade: OptimizationFacade,
    private truckFacade: TrucksFacade,
    private deliveryFacade: DeliveryRequestsFacade,
  ) {
    this.truckFacade.trucks$
      .pipe(
        tap((trucks) => (this.trucks = trucks)),
        map((trucks) =>
          trucks.map((t) => {
            return {
              truckId: t.number,
              truckName: t.name,
              truckNumber: t.number,
              ticketsCount: 0,
              isOptimize: true,
              productsConstraints: {
                capacityMode: null,
                productsData: t.compartments.map((c) => {
                  return {
                    product: c.product,
                    load: c.load,
                    capacity: c.capacity,
                  };
                }),
              },
            };
          }),
        ),
        map((trucks) => (this.model = trucks)),
        untilDestroyed(this),
      )
      .subscribe();

    this.optimizationFacade.optimizationProducts$.subscribe(
      (products) => (this.optimizationProds = products),
    );

    this.optimizationFacade.optimizationJobs$.subscribe(
      (jobs) => (this.optimizationJobs = jobs),
    );
  }

  ngOnInit(): void {
    this.setFields();
  }

  private setFields(): void {
    this.fields = [
      {
        fieldGroupClassName: 'quick_dispatch-form',
        fieldGroup: [this.setTruckSection()],
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
          },
        ],
      },
    };
  }

  optimizeVrp() {
    this.optimizationStep = 'result';

    this.vrpService
      .optimize({
        jobs: this.optimizationJobs,
        vehicles: this.model.map((x) => {
          const currentTruck = this.trucks.find((t) => t.number === x.truckId);

          const startLocation =
            x.truckConstraints?.startLocation === KnownLocation.VehicleLocation
              ? new Coordinate(
                  currentTruck?.longitude ?? 0,
                  currentTruck?.latitude ?? 0,
                )
              : x.truckConstraints?.startLocationCoordinate;

          const endLocation =
            x.truckConstraints?.endLocation === KnownLocation.VehicleLocation
              ? new Coordinate(
                  currentTruck?.longitude ?? 0,
                  currentTruck?.latitude ?? 0,
                )
              : x.truckConstraints?.endLocationCoordinate;

          const capacity = [this.optimizationProds.length];
          const initialLoad = [this.optimizationProds.length];

          for (let i = 0; i < this.optimizationProds.length; i++) {
            capacity[i] = 0;
            initialLoad[i] = 0;
          }

          x.productsConstraints?.productsData?.forEach((c) => {
            const index = this.optimizationProds.findIndex(
              (p) => p.number === c.product?.number,
            );

            capacity[index] = capacity[index]
              ? capacity[index] + c.capacity
              : c.capacity;
            initialLoad[index] = initialLoad[index]
              ? initialLoad[index] + c.load
              : c.load;
          });

          return {
            id: x.truckId,
            capacity: capacity,
            initialLoad: initialLoad,
            start: startLocation,
            end: endLocation,
            trackMode: x.truckConstraints!.trackMode ?? TrackMode.ROUND_TRIP,
          };
        }),
      })
      .subscribe((result) => {
        this.vrpResults = result;

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
              (r) => r.vehicleId,
            );
            this.truckFacade.trucks$
              .pipe(
                map((trucks) =>
                  trucks
                    .filter((t) => trucksForOptimization?.includes(t.number))
                    .map((t) => {
                      const features: Feature<Point, GeoJsonProperties> = {
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
  }
}
