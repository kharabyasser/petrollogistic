import { Component, OnInit } from '@angular/core';
import { TrucksFacade } from '../../../../+state/trucks/trucks-facade';
import { Truck } from '../../../../domain/truck';
import { MapsFacade } from '../../../../+state/maps/maps-facade';
import { TrackMode } from '../../../../models/routing/vrp-request';
import { tap } from 'rxjs';

@Component({
  selector: 'petrologistic-quick-dispatch-truck',
  templateUrl: './quick-dispatch.truck.html',
  styleUrls: ['./quick-dispatch.truck.scss'],
})
export class QuickDispatchTruckComponent implements OnInit {
  trucks: Truck[] = [];
  returnSites = ['Round Trip', 'Same as Last', 'Return to Depot'];
  depots = ['Depot #1', 'Depot #2', 'Depot #3'];
  atoModes = ['Optimize', 'Forced', 'Custom'];
  capacityModes = ['Truck Load', 'Full', 'Empty', 'Custom'];

  productsData: any[] = [];

  miniTicketsView = true;
  chartsCollapsed = false;
  hideCharts = false;

  constructor(
    private trucksFacade: TrucksFacade,
    private mapsFacade: MapsFacade
  ) {
    this.trucksFacade.trucks$.subscribe((trucks) => {
      this.trucks = trucks;
      this.trucks.forEach((t) => this.addToOptimizationVehicules(t));

      this.trucksFacade.trucks$
      .pipe(
        tap((trucks) => {
          trucks.forEach((t) => {
            const productsLoads = t.compartments.map((c) => {
              return {
                label: c.product.name,
                load: c.load,
              };
            });

            if (productsLoads.length > 0) {
              this.productsData.push(productsLoads);
            }
          });
        })
      )
      .subscribe();
    });
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

  selectTruck(checked: boolean, truck: Truck) {
    if (checked) {
      this.addToOptimizationVehicules(truck);
    } else {
      this.mapsFacade.removeOptimizationVehicule(truck.number);
    }
  }

  addToOptimizationVehicules(truck: Truck) {
    this.mapsFacade.addOptimizationVehicule({
      id: truck.number,
      start: { 
        latitude: truck.latitude,
        longitude: truck.longitude
      },
      trackMode: TrackMode.LastVisit
    });
  }
}
