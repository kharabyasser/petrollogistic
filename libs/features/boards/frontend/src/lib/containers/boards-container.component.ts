import {
  Component
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DeliveryRequestsFacade } from '../+state/delivery-requests/delivery-requests-facade';
import { MapMarker } from '../models/maps/map-marker';
import { TrucksFacade } from '../+state/trucks/trucks-facade';
import { Coordinate } from '../models/maps/coordinate';
import { MapsFacade } from '../+state/maps/maps-facade';
import { map } from 'rxjs';

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
  deliveriesMarkersList: MapMarker[] = [];
  trucksMarkersList: MapMarker[] = [];
  layoutOptions: any[] = [];
  _selectedLayout = 'table';
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
  }

  set selectedLayout(value: string) {
    if (value === 'map' && this._selectedLayout !== 'map') {
      this._selectedLayout = value;
      this.initMaps();
    } else {
      this._selectedLayout = value;
    }
  }

  get selectedLayout () {
    return this._selectedLayout;
  }

  initMaps() {
    this.deliveriesFacade.deliveryRequests$
      .pipe(
        map((deliveries) =>
          deliveries.map(
            (d) =>
              new MapMarker(
                new Coordinate(
                  d.shipToAccount.longtitude,
                  d.shipToAccount.latitude
                ),
                undefined,
                '#FF0000'
              )
          )
        )
      )
      .subscribe((markers) => {
        this.deliveriesMarkersList = markers;
        this.mapsFacade.addMarkers(
          this.deliveriesMarkersList.concat(this.trucksMarkersList)
        );
      });

    this.trucksFacade.trucks$
      .pipe(
        map((trucks) =>
          trucks.map(
            (d) =>
              new MapMarker(
                new Coordinate(d.longtitude, d.latitude),
                '../assets/truck.png',
                '#000000'
              )
          )
        )
      )
      .subscribe((markers) => {
        this.trucksMarkersList = markers;
        this.mapsFacade.addMarkers(
          this.trucksMarkersList.concat(this.deliveriesMarkersList)
        );
      });
  }
}
