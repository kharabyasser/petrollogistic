import { Component, OnInit } from '@angular/core';
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

  _selectedColumns: any[] = [];

  constructor(private DeliveryRequestsService: DeliveryRequestService) {}

  ngOnInit() {
    this.DeliveryRequestsService.getDeliveryRequests().subscribe((result) => {
      this.deliveryRequests = [...result.data.deliveryRequests];
      console.log(result.data.deliveryRequests);
    });

    this.cols = [
      { field: 'source', header: ''},
      { field: 'urgent', header: 'Urgent' },
      { field: 'shipToAccount', header: 'Ship To Account' },
      { field: 'currentPercentage', header: 'Percentage' },
      { field: 'creationDate', header: 'Creation Date' },
      { field: 'product', header: 'Product' },
      { field: 'dispatchStatus', header: 'Dispatch Status' },
      { field: 'truck', header: 'Truck' },
      { field: 'dispatchDate', header: 'Dispatch Date' },
    ];

    this._selectedColumns = this.cols;
  }

  get selectedColumns(): any {
    return this._selectedColumns;
  }

  set selectedColumns(vals: any) {
    this._selectedColumns = this.cols.filter((col) => vals.includes(col));
  }

  filter(event: any){
    console.log(event);
  }

  clear(table: Table) {
    table.clear();
  }
}
