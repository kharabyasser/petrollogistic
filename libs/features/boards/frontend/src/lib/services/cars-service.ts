import { Injectable } from '@angular/core';
import { Car } from '../domain/car';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  getCars() {
    this.cars = [
      { id: 1, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 2, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 3, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 4, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 5, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 6, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 7, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 8, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 9, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 10, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 11, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 12, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 13, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 14, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 15, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 16, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 17, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 18, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 19, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 20, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 21, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 22, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 23, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 24, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 25, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 26, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 27, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 28, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
      { id: 29, brand: 'BMW', color: 'Red', vin: '234', year: 1993 },
      { id: 30, brand: 'Mercedes', color: 'Black', vin: '487', year: 1997 },
    ];

    return this.cars;
  }
}
