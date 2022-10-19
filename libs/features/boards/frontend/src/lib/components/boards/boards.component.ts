import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { Car } from '../../domain/car';
import { CarsService } from '../../services/cars-service';

@Component({
  selector: 'petrologistic-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  cars: Car[] = [];

  selectedCars: Car[] = [];

  cols: any[] = [];

  _selectedColumns: any[] = [];

  constructor(private carsService: CarsService) {}

  ngOnInit() {
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
