import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { Account } from '../../domain/account';
import { DeliveryRequest } from '../../domain/deliveryrequest';
import { DeliveryRequestService } from '../../services/deliveryrequest-service';

@Component({
  selector: 'petrologistic-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  deliveryRequests: DeliveryRequest[] = [];
  selectedRequests: DeliveryRequest[] = [];

  accountFilterPropertyOptions = ['Name', 'Address'];

  cols: any[] = [];
  tags: SelectItem[] = [];
  selectedCols: any[] = [];

  tagFilterModeOptions: SelectItem[] = [];
  accountFilterModeOptions: SelectItem[] = [];

  constructor(private DeliveryRequestsService: DeliveryRequestService, private filterService: FilterService) { }

  ngOnInit() {
    this.DeliveryRequestsService.getDeliveryRequests().subscribe((result) => {
      this.deliveryRequests = [...result.data.deliveryRequests];
      this.tags = this.deliveryRequests
        .flatMap(d => d.tags)
        .filter((value, index, array) => {
          return array.indexOf(value) === index;
        })
        .map(tag => ({ label: tag, value: tag } as SelectItem));
    });

    this.cols = [
      { field: 'tags', header: 'Tags' },
      { field: 'purchaseOrder', header: 'Purchase Order' },
      { field: 'shipToAccount', header: 'Ship to Account' },
    ];

    this.selectedCols = this.cols;

    const tagFilterContainsName = 'contains-tag-filter';
    const tagFilterExactName = 'exact-match-tag-filter';
    const accountFilterName = 'account-name-filter';
    const accountFilterAddress = 'account-address-filter';
    const accountFilterPhone = 'account-phone-filter';

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

    this.tagFilterModeOptions = [
      { label: 'Contains', value: tagFilterContainsName },
      { label: 'Exact Match', value: tagFilterExactName },
    ];

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
}
