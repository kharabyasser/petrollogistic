import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Account } from '../../domain/account';
import { DeliveryRequest } from '../../domain/deliveryrequest';
import { select, Store } from '@ngrx/store';
import * as RequestsActions from '../../+state/delivery-requests-actions';
import { map, Observable } from 'rxjs';
import { requestsSelector } from '../../+state/delivery-requests.selectors';
import { formatDate } from '@angular/common';
import { Container } from '../../domain/container';

@Component({
  selector: 'petrologistic-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  deliveryRequests$: Observable<DeliveryRequest[]> = new Observable<DeliveryRequest[]>();
  selectedRequests: DeliveryRequest[] = [];

  cols: any[] = [];
  selectedCols: any[] = [];

  tags: SelectItem[] = [];
  dispatchStatuses: SelectItem[] = [];
  tagFilterModeOptions: SelectItem[] = [];
  accountFilterModeOptions: SelectItem[] = [];
  dispatchStatusesModeOptions: SelectItem[] = [];

  constructor(private filterService: FilterService, private store: Store) {
    this.deliveryRequests$ = this.store.pipe(select(requestsSelector))
      .pipe(
        map(reqs =>
          reqs.map(item => ({
            ...item,
            tags: item.destinationContainers.length == 1 ? item.tags : item.tags.concat('Fleet'),
            creationDate: formatDate(item.creationDate, 'dd/MM/yyyy', 'en-US'),
            targetDate: formatDate(item.targetDate, 'dd/MM/yyyy', 'en-US'),
            dispatchDate: formatDate(item.targetDate, 'dd/MM/yyyy', 'en-US'),
            lowestContainer: item.destinationContainers.reduce((prev: Container, curr: Container) =>
              (prev?.currentPercentage < curr.currentPercentage ? prev : curr))
          })))
      );

      this.deliveryRequests$.pipe(
        map(reqs =>
          reqs.flatMap(req => req.tags)
            .filter((value, index, array) => array.indexOf(value) === index)
            .map(tag => ({ label: tag, value: tag } as SelectItem)))
      ).subscribe(item => this.tags = item);
  
      this.deliveryRequests$.pipe(
        map(reqs =>
          reqs.flatMap(req => req.dispatchStatus)
            .filter((value, index, array) => array.indexOf(value) === index)
            .map(dispatchStatus => ({ label: dispatchStatus.toString(), value: dispatchStatus.toString() } as SelectItem)))
      ).subscribe(item => this.dispatchStatuses = item);
  }

  ngOnInit() {
    this.store.dispatch(RequestsActions.getDeliveryRequests());

    this.cols = [
      { selector: 'tags', field: 'tags', header: 'Tags' },
      { selector: 'purchaseOrder', field: 'purchaseOrder', header: 'Purchase Order', sortCol: 'purchaseOrder', filterType: 'numeric' },
      { selector: 'shipToAccount', field: 'shipToAccount', header: 'Ship to Account', sortCol: 'shipToAccount.name' },
      { selector: 'lowestContainer', field: 'lowestContainer', header: 'Percentage', sortCol: 'lowestContainer.currentPercentage' },
      { selector: 'creationDate', field: 'creationDate', header: 'Creation Date', sortCol: 'creationDate', filterType: 'date' },
      { selector: 'targetDate', field: 'targetDate', header: 'Target Date', sortCol: 'targetDate', filterType: 'date' },
      { selector: 'product', field: 'lowestContainer', header: 'Product', sortCol: 'lowestContainer.requestedAmount' },
      { selector: 'dispatchStatus', field: 'dispatchStatus', header: 'Status', sortCol: 'dispatchStatus' },
      { selector: 'dispatchedToTruck', field: 'dispatchedToTruck', header: 'Truck', sortCol: 'dispatchedToTruck', filterType: 'text' },
      { selector: 'dispatchDate', field: 'dispatchDate', header: 'Dispatch Date', sortCol: 'dispatchDate', filterType: 'date' },
    ];

    this.selectedCols = this.cols;

    const tagFilterContainsName = 'contains-tag-filter';
    const tagFilterExactName = 'exact-match-tag-filter';
    const accountFilterName = 'account-name-filter';
    const accountFilterAddress = 'account-address-filter';
    const accountFilterPhone = 'account-phone-filter';
    const dispatchStatusFilter = 'dispatchStatus-filter';

    this.filterService.register(tagFilterContainsName, (value: string[], filter: string[]): boolean => {
      if (filter === undefined || filter === null || filter.length === 0) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return filter.every(elem => value.includes(elem));
    });

    this.filterService.register(tagFilterExactName, (value: string[], filter: string[]): boolean => {
      if (filter === undefined || filter === null || filter.length === 0) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      if (value.length === filter.length) {
        return value.every(element => {
          if (filter.includes(element)) {
            return true;
          }

          return false;
        });
      }

      return false;
    });

    this.filterService.register(accountFilterName, (value: Account, filter: string): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value.name.toLowerCase().includes(filter.toLowerCase());
    });

    this.filterService.register(accountFilterAddress, (value: Account, filter: string): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      const address = value.address.addressLine1 +
        value.address.addressLine2 +
        value.address.city +
        value.address.province +
        value.address.country +
        value.address.postalCode;

      return address.toLowerCase().includes(filter.toLowerCase());
    });

    this.filterService.register(accountFilterPhone, (value: Account, filter: string): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      const phone = value.phoneNumber;

      return phone.toLowerCase().includes(filter.toLowerCase());
    });

    this.filterService.register(dispatchStatusFilter, (value: string, filter: string): boolean => {
      if (filter === undefined || filter === null) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return filter === value;
    });

    this.tagFilterModeOptions = [
      { label: 'Contains', value: tagFilterContainsName },
      { label: 'Exact Match', value: tagFilterExactName },
    ];

    this.accountFilterModeOptions = [
      { label: 'Name', value: accountFilterName },
      { label: 'Address', value: accountFilterAddress },
      { label: 'Phone', value: accountFilterPhone },
    ];

    this.dispatchStatusesModeOptions = [
      { label: 'Status', value: dispatchStatusFilter }
    ]
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
}