import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { Car } from '../../domain/car';

@Component({
  selector: 'petrologistic-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {
  cars: Car[] = [
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    { brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
    { brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
  ];

  clear(table: Table) {
    table.clear();
  }
}




