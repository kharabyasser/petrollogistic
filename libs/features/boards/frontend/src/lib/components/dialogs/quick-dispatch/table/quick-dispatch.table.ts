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

  private readonly DIALOG_WIDTH = '500px';
  private readonly DIALOG_HEIGHT = 'fit-content';

  tagFilterModeOptions: SelectItem[] = [];
  accountFilterModeOptions: SelectItem[] = [];

  constructor(
    private filterService: FilterService,
    private deliveryRequestsFacade: DeliveryRequestsFacade,
    private dialogService: DialogService
  ) {
    this.deliveryRequests$ = this.deliveryRequestsFacade.deliveryRequests$.pipe(
      map((reqs) =>
        reqs
          .map((item) => ({
            ...item,
            lowestContainer: item.destinationContainers.reduce(
              (prev: Container, curr: Container) =>
                prev?.currentPercentage < curr.currentPercentage ? prev : curr
            ),
          }))
          .filter((req) => req.dispatchStatus.toString() === 'PENDING')
      )
    );
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
        header: 'Constraints'
      },
      {
        selector: 'constraintsParams',
        header: ''
      }
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
      }
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
      }
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
      }
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

  onRowSelect(event: any) {}

  onHeaderSelectionToggle(event: any) {}

  onRowUnselect(event: any) {}

  openDispatchSettings() {
    this.dialogService
      .open(DeliverySettingsComponent, {
        header: 'Ticket Dispatch Constraints',
        width: this.DIALOG_WIDTH,
        height: this.DIALOG_HEIGHT
      })
  }
}
