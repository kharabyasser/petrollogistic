import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DeliveryRequestsFacade } from '../+state/delivery-requests/delivery-requests-facade';
import { TrucksFacade } from '../+state/trucks/trucks-facade';
import { MapsFacade } from '../+state/maps/maps-facade';
import { map } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { QuickDispatchComponent } from '../components/dialogs/quick-dispatch/quick-dispatch.component';
import { Feature, GeoJsonProperties, Point } from 'geojson';

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
  layoutOptions: any[] = [];

  _selectedLayout = 'table';
  detailsState = '';

  private readonly DIALOG_WIDTH = '1500px';
  private readonly DIALOG_HEIGHT = 'fit-content';

  constructor(
    private deliveriesFacade: DeliveryRequestsFacade,
    private trucksFacade: TrucksFacade,
    private mapsFacade: MapsFacade,
    private dialogService: DialogService
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

  get selectedLayout() {
    return this._selectedLayout;
  }

  initMaps() {
    this.deliveriesFacade.deliveryRequests$
      .pipe(
        map((deliveries) =>
          deliveries.map((d) => {
            const features: Feature<Point, GeoJsonProperties> = {
              type: 'Feature',
              properties: {
                tag: 'delivery',
                symbol: d.purchaseOrder.toString()
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  d.shipToAccount.longtitude,
                  d.shipToAccount.latitude,
                ],
              },
            };

            return features;
          })
        )
      )
      .subscribe((features) => {
        this.mapsFacade.addMarkers(features);
      });

    this.trucksFacade.trucks$
      .pipe(
        map((trucks) =>
          trucks.map((d) => {
            const features: Feature<Point, GeoJsonProperties> = {
              type: 'Feature',
              properties: {
                tag: 'truck',
                symbol: d.number.toString()
              },
              geometry: {
                type: 'Point',
                coordinates: [d.longtitude, d.latitude],
              },
            };

            return features;
          })
        )
      )
      .subscribe((features) => {
        this.mapsFacade.addMarkers(features);
      });
  }

  openQuickDispatch() {
    this.dialogService.open(QuickDispatchComponent, {
      header: 'Quick Dispatch',
      width: this.DIALOG_WIDTH,
    });
  }
}
