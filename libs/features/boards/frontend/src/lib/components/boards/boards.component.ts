import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Car } from '../../domain/car';
import { DeliveryRequest } from '../../domain/delivery-request';
import { CarsService } from '../../services/cars-service';
import { DeliveryRequestService } from '../../services/deliveryrequest-service';

@Component({
  selector: 'petrologistic-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  deliveryRequests: DeliveryRequest[] = [];

  cars: Car[] = [];

  selectedCars: Car[] = [];

  cols: any[] = [];

  _selectedColumns: any[] = [];

  constructor(private carsService: CarsService, private DeliveryRequestsService: DeliveryRequestService) {}

  ngOnInit() {
    this.deliveryRequests = this.DeliveryRequestsService.getDeliveryRequests();

    console.log(this.deliveryRequests);

    this.cars = this.carsService.getCars();

    this.cols = [
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' },
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
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
