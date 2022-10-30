import { Component, OnInit } from '@angular/core';
import { FilterService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
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

  cols: any[] = [];
  tags:SelectItem [] = [];
  selectedCols: any[] = [];

  matchModeOptions: SelectItem[] = [];

  constructor(private DeliveryRequestsService: DeliveryRequestService, private filterService: FilterService) {}

  ngOnInit() {
    this.DeliveryRequestsService.getDeliveryRequests().subscribe((result) => {
      this.deliveryRequests = [...result.data.deliveryRequests];
      this.tags = this.deliveryRequests
      .flatMap(d => d.tags)
      .filter((value, index, array) => 
      {
        return array.indexOf(value) === index;        
      })
      .map(tag => ({ label: tag, value: tag } as SelectItem));
    });

    this.cols = [
      { field: 'tags', header: 'Tags'},
      { field: 'purchaseOrder', header: 'Purchase Order' },
    ];

    this.selectedCols = this.cols;

    const containsTagFilterName = 'contains-tag';
    const exactMatchTagFilterName = 'exact-match-tag';

        this.filterService.register(containsTagFilterName, (value: string[], filter: string[]): boolean => {
            if (filter === undefined || filter === null || filter.length === 0) {
                return true;
            }

            if (value === undefined || value === null) {
                return false;
            }

            return filter.every(elem => value.includes(elem));
        });

        this.filterService.register(exactMatchTagFilterName, (value: string[], filter: string[]): boolean => {
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

       this.matchModeOptions = [
          { label: 'Contains', value: containsTagFilterName },
          { label: 'Exact Match', value: exactMatchTagFilterName }
      ];
  }

  get selectedColumns(): any {
    return this.selectedCols;
  }

  set selectedColumns(vals: any) {
    this.selectedCols = this.cols.filter((col) => vals.includes(col));
  }

  filter(event: any){
    console.log(event);
  }

  clear(table: Table) {
    table.clear();
  }
}
