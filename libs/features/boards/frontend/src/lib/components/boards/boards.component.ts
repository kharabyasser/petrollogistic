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
      this.deliveryRequests = result.data.deliveryRequests;
      console.log(result.data.deliveryRequests);
    });

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'source', header: 'Source' },
      { field: 'targetDate', header: 'Target Date' },
      { field: 'purchaseOrder', header: 'Purchase Order' },
      { field: 'rank', header: 'Rank' },
    ];

    this._selectedColumns = this.cols;
  }

  get selectedColumns(): any {
    return this._selectedColumns;
  }

  set selectedColumns(vals: any) {
    this._selectedColumns = this.cols.filter((col) => vals.includes(col));
  }

  clear(table: Table) {
    table.clear();
  }
}
