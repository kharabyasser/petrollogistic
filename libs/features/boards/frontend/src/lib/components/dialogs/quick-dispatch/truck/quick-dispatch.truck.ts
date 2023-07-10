import { Component, OnInit } from '@angular/core';
import { TrucksFacade } from '../../../../+state/trucks/trucks-facade';
import { Truck } from '../../../../domain/truck';
import { MapsFacade } from '../../../../+state/maps/maps-facade';
import { TrackMode } from '../../../../models/routing/vrp-request';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'petrologistic-quick-dispatch-truck',
  templateUrl: './quick-dispatch.truck.html',
  styleUrls: ['./quick-dispatch.truck.scss'],
})
export class QuickDispatchTruckComponent implements OnInit {
  form = new FormGroup({});
  model = null;
  fields: FormlyFieldConfig[] = [];

  trucks$: Observable<Truck[]>;

  capacityModes = ['Truck Load', 'Full', 'Empty', 'Custom'];

  productsData: any[] = [];
  miniTicketsView = true;
  chartsCollapsed = false;
  hideCharts = false;

  constructor(
    private trucksFacade: TrucksFacade,
    private mapsFacade: MapsFacade
  ) {
    this.trucks$ = this.trucksFacade.trucks$;
  }

  ngOnInit(): void {
    this.trucksFacade.loadTrucks();
    
    this.setFields();
  }

  setFields(): void {
    this.setTruckConstraintsSection();
  }

  setTruckConstraintsSection(): void {
    const truckConstraints: FormlyFieldConfig[] = [
      this.setTruckConstraints(),
    ];

    for (const field of truckConstraints) {
      this.fields[0].fieldGroup?.push(field);
    }
  }

  setTruckConstraints(): FormlyFieldConfig {
    return {
      key: 'truck',
      type: 'truckConstraintsFrom'
    };
  }

  // TODO: Move to formly.
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
        longitude: truck.longitude,
      },
      trackMode: TrackMode.LastVisit,
    });
  }
}
