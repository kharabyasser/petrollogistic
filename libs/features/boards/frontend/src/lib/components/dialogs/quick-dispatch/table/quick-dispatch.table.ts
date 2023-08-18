import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Account } from '../../../../domain/account';
import { DeliveryRequest } from '../../../../domain/deliveryrequest';
import { Observable, map } from 'rxjs';
import { DeliveryRequestsFacade } from '../../../../+state/delivery-requests/delivery-requests-facade';
import { Container } from '../../../../domain/container';
import { DialogService } from 'primeng/dynamicdialog';
import { DeliverySettingsComponent } from '../dispatch-delivery-settings/delivery-settings.component';
import { MapsFacade } from '../../../../+state/maps/maps-facade';
import { MapMarker } from '../../../../models/maps/map-marker';
import { Coordinate } from '../../../../models/maps/coordinate';
import { TrucksFacade } from '../../../../+state/trucks/trucks-facade';
import { Feature, GeoJsonProperties, Point } from 'geojson';
import { OptimizationFacade } from '../../../../+state/optimization/optimization-facade';
import { Product } from '../../../../domain/product';

@Component({
  selector: 'petrologistic-quick-dispatch-table',
  templateUrl: './quick-dispatch.table.html',
  styleUrls: ['./quick-dispatch.table.scss'],
})
export class QuickDispatchTableComponent implements OnInit {
  deliveryRequests$: Observable<DeliveryRequest[]> = new Observable<
    DeliveryRequest[]
  >();

  cols: any[] = [];
  selectedCols: any[] = [];
  selectedRequests: DeliveryRequest[] = [];
  trucksMarkers: MapMarker[] = [];

  private readonly DIALOG_WIDTH = '500px';
  private readonly DIALOG_HEIGHT = 'fit-content';

  tagFilterModeOptions: SelectItem[] = [];
  accountFilterModeOptions: SelectItem[] = [];

  optimizationProds: Product[] = [];

  constructor(
    private filterService: FilterService,
    private deliveryRequestsFacade: DeliveryRequestsFacade,
    private dialogService: DialogService,
    private mapsFacade: MapsFacade,
    private optimizationFacade: OptimizationFacade,
    private trucksFacade: TrucksFacade,
  ) {
    this.optimizationFacade.optimizationProducts$.subscribe(
      (products) => (this.optimizationProds = products),
    );

    this.deliveryRequests$ = this.deliveryRequestsFacade.deliveryRequests$.pipe(
      map((reqs) =>
        reqs
          .map((item) => ({
            ...item,
            lowestContainer: item.destinationContainers.reduce(
              (prev: Container, curr: Container) =>
                prev?.currentPercentage < curr.currentPercentage ? prev : curr,
            ),
          }))
          .filter((req) => req.dispatchStatus.toString() === 'PENDING'),
      ),
    );

    this.deliveryRequests$.subscribe((reqs) => {
      this.selectedRequests = reqs;
      this.updateSelectedOnMap();
      this.selectedRequests.forEach((x) => this.addToOptimizationJobs(x));
    });

    this.trucksFacade.trucks$
      .pipe(
        map((trucks) =>
          trucks.map(
            (d) =>
              new MapMarker(
                new Coordinate(d.longitude, d.latitude),
                '../assets/truck.png',
                '#000000',
              ),
          ),
        ),
      )
      .subscribe((markers) => {
        this.trucksMarkers = markers;
      });
  }

  ngOnInit() {
    this.cols = [
      {
        selector: 'purchaseOrder',
        field: 'purchaseOrder',
        header: 'Purchase Order',
        sortCol: 'purchaseOrder',
        filterType: 'numeric',
      },
      {
        selector: 'shipToAccount',
        field: 'shipToAccount',
        header: 'Ship to Account',
        sortCol: 'shipToAccount.name',
      },
      {
        selector: 'product',
        field: 'lowestContainer',
        header: 'Product',
        sortCol: 'lowestContainer.requestedAmount',
      },
      {
        selector: 'constraints',
        header: 'Constraints',
      },
      {
        selector: 'constraintsParams',
        header: '',
      },
    ];

    this.selectedCols = this.cols;

    const accountFilterName = 'account-name-filter';
    const accountFilterAddress = 'account-address-filter';
    const accountFilterPhone = 'account-phone-filter';

    this.filterService.register(
      accountFilterName,
      (value: Account, filter: string): boolean => {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.name.toLowerCase().includes(filter.toLowerCase());
      },
    );

    this.filterService.register(
      accountFilterAddress,
      (value: Account, filter: string): boolean => {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        const address =
          value.address.addressLine1 +
          value.address.addressLine2 +
          value.address.city +
          value.address.province +
          value.address.country +
          value.address.postalCode;

        return address.toLowerCase().includes(filter.toLowerCase());
      },
    );

    this.filterService.register(
      accountFilterPhone,
      (value: Account, filter: string): boolean => {
        if (filter === undefined || filter === null) {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        const phone = value.phoneNumber;

        return phone.toLowerCase().includes(filter.toLowerCase());
      },
    );

    this.accountFilterModeOptions = [
      { label: 'Name', value: accountFilterName },
      { label: 'Address', value: accountFilterAddress },
      { label: 'Phone', value: accountFilterPhone },
    ];
  }

  get selectedColumns(): any {
    return this.selectedCols;
  }

  set selectedColumns(vals: any) {
    this.selectedCols = this.cols.filter((col) => vals.includes(col));
  }

  clear(table: Table) {
    table.clear();
  }

  spread(items: any[]): any {
    return [...items];
  }

  onRowSelect(event: any) {
    this.addToOptimizationJobs(event.data);
    this.updateSelectedOnMap();
  }

  onHeaderSelectionToggle(event: any) {
    if (!event.checked) {
      this.deliveryRequests$
        .pipe(
          map((requests) =>
            requests.map((request) =>
              this.optimizationFacade.removeOptimizationJob(
                request.purchaseOrder,
              ),
            ),
          ),
        )
        .subscribe();
    } else {
      this.deliveryRequests$
        .pipe(
          map((requests) =>
            requests.map((request) => this.addToOptimizationJobs(request)),
          ),
        )
        .subscribe();
    }

    this.updateSelectedOnMap();
  }

  onRowUnselect(event: any) {
    this.optimizationFacade.removeOptimizationJob(event.data.id);
    this.updateSelectedOnMap();
  }

  openDispatchSettings() {
    this.dialogService.open(DeliverySettingsComponent, {
      header: 'Ticket Dispatch Constraints',
      width: this.DIALOG_WIDTH,
      height: this.DIALOG_HEIGHT,
    });
  }

  addToOptimizationJobs(request: DeliveryRequest) {
    const demands = [this.optimizationProds.length];

    for (let i = 0; i < this.optimizationProds.length; i++) {
      demands[i] = 0;
    }

    request.destinationContainers?.forEach((c) => {
      debugger;
      const index = this.optimizationProds.findIndex(
        (p) => p.number === c.product?.number,
      );

      // -1 means product is in demand but not provided but vehicles.
      // in this scenario we are ignoring that product.
      if (index >= 0) {
        demands[index] = demands[index]
          ? demands[index] + c.requestedAmount
          : c.requestedAmount;
      }
    });

    const job = {
      id: request.purchaseOrder,
      location: {
        longitude: request.shipToAccount.longitude,
        latitude: request.shipToAccount.latitude,
      },
      demands: demands,
    };

    this.optimizationFacade.addOptimizationJob(job);
  }

  updateSelectedOnMap() {
    this.mapsFacade.replaceMarkers(
      this.selectedRequests.map((d) => {
        const features: Feature<Point, GeoJsonProperties> = {
          type: 'Feature',
          properties: {
            tag: 'delivery',
            symbol: d.purchaseOrder.toString(),
          },
          geometry: {
            type: 'Point',
            coordinates: [d.shipToAccount.longitude, d.shipToAccount.latitude],
          },
        };

        return features;
      }),
    );
  }
}
