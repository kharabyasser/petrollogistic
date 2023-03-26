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
import { MapMarker } from '../models/maps/map-marker';
import { TrucksFacade } from '../+state/trucks/trucks-facade';
import { Coordinate } from '../models/maps/coordinate';
import { Observable, of } from 'rxjs';
import { MapsFacade } from '../+state/maps/maps-facade';

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
  markersList: MapMarker[] = [];
  markers: Observable<MapMarker[]> = of(this.markersList);
  layoutOptions: any[] = [];
  selectedLayout = 'map';
  detailsState = '';

  constructor(
    private deliveriesFacade: DeliveryRequestsFacade,
    private trucksFacade: TrucksFacade,
    private mapsFacade: MapsFacade
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
        this.markersList.push(
          new MapMarker(
            new Coordinate(d.shipToAccount.longtitude, d.shipToAccount.latitude),
            undefined,
            '#FF0000'
          )
        )
      )
    );

    this.trucksFacade.trucks$.subscribe((trucks) =>
      trucks.map((d) =>
        this.markersList.push(
          new MapMarker(new Coordinate(d.longtitude, d.latitude), '../assets/truck.png', '#000000')
        )
      )
    );

    this.markers.subscribe(x => 
      this.mapsFacade.addMarkers(x));
  }
}
