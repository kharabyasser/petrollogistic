import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DeliveryRequest } from '../domain/deliveryrequest';
import { DeliveryRequestsFacade } from '../+state/delivery-requests/delivery-requests-facade';
import { MapMarker } from '../models/map-marker';
import { TrucksFacade } from '../+state/trucks/trucks-facade';

@Component({
  selector: 'petrologistic-boards-container',
  templateUrl: './boards-container.component.html',
  styleUrls: ['./boards-container.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          width: '75vw',
        })
      ),
      state(
        'out',
        style({
          width: '100vw',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class BoardsContainerComponent {
  deliveryRequests: DeliveryRequest[] = [];
  selectedCoordinates: MapMarker[] = [];
  layoutOptions: any[] = [];
  selectedLayout = 'map';
  detailsState = '';

  constructor(
    private deliveriesFacade: DeliveryRequestsFacade,
    private trucksFacade: TrucksFacade
  ) {
    this.deliveriesFacade.selectedRequests$.subscribe(
      (x) => (this.detailsState = x.length > 0 ? 'in' : 'out')
    );

    this.layoutOptions = [
      { icon: 'pi pi-table', value: 'table' },
      { icon: 'pi pi-map', value: 'map' },
    ];

    this.deliveriesFacade.deliveryRequests$.subscribe((deliveries) =>
      deliveries.map((d) =>
        this.selectedCoordinates.push(
          new MapMarker(
            d.shipToAccount.longtitude,
            d.shipToAccount.latitude,
            undefined,
            '#FF0000'
          )
        )
      )
    );

    this.trucksFacade.trucks$.subscribe((trucks) =>
      trucks.map((d) =>
        this.selectedCoordinates.push(
          new MapMarker(d.longtitude, d.latitude, '../assets/truck.png', '#000000')
        )
      )
    );
  }
}
