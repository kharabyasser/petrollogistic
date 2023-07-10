import { Component, OnInit } from '@angular/core';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { TrucksFacade } from '../../../+state/trucks/trucks-facade';
import { Truck } from '../../../domain/truck';
import { Coordinate } from '../../../models/maps/coordinate';
import { RoutingService } from '../../../services/routing-service';
import {
  Observable,
  tap
} from 'rxjs';
import { DeliveryRequestsFacade } from '../../../+state/delivery-requests/delivery-requests-facade';

@Component({
  selector: 'petrologistic-truck-detail',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss'],
})
export class TruckComponent implements OnInit {
  trucks$: Observable<Truck[]>;

  productsData: any[] = [];

  miniTicketsView = true;
  chartsCollapsed = false;
  hideCharts = false;

  horizontalOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };

  constructor(
    private trucksFacade: TrucksFacade,
    private deliveriesFacade: DeliveryRequestsFacade,
    private mapsFacade: MapsFacade,
    private routingService: RoutingService
  ) {
    this.trucks$ = this.trucksFacade.trucks$;

    this.trucksFacade.trucks$
      .pipe(
        tap((trucks) => {
          trucks.forEach((t) => {
            const productsLoads = t.compartments.map((c) => {
              return {
                labels: c.product.name,
                loads: c.load,
              };
            });

            if (productsLoads.length > 0) {
              const truckDataSet = {
                labels: productsLoads.map((x: any) => x.labels),
                datasets: [
                  {
                    label: 'In truck',
                    data: productsLoads.map((x: any) => x.loads),
                    backgroundColor: '#33C4FF',
                    borderColor: 'blue',
                    maxBarThickness: 30,
                    borderWidth: 1,
                  },
                ],
              };

              this.productsData.push(truckDataSet);
            }
          });
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.trucksFacade.loadTrucks();
  }

  onBeforeToggle() {
    if (this.chartsCollapsed) this.hideCharts = false;
  }

  onAfterToggle() {
    this.hideCharts = this.chartsCollapsed;
  }

  locate(truck: Truck) {
    this.mapsFacade.centerOn(new Coordinate(truck.longitude, truck.latitude));
  }

  isochrone(truck: Truck) {
    const ranges: number[] = [];
    for (let i = 1200; i >= 0; i -= 200) {
      ranges.push(i);
    }

    this.routingService
      .getIsochrone({
        locations: [[truck.longitude, truck.latitude]],
        range: ranges,
      })
      .subscribe((x) => {
        this.mapsFacade.addIsochroneData(x);
      });
  }
}
