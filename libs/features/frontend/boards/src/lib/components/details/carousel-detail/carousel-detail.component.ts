import { Component, OnInit } from '@angular/core';
import { Car } from '../../../domain/car';
import { CarsService } from '../../../services/cars-service';

@Component({
  selector: 'petrologistic-carousel-detail',
  templateUrl: './carousel-detail.component.html',
  styleUrls: ['./carousel-detail.component.scss'],
})
export class CarouselDetailComponent implements OnInit {
  cars: Car[] = [];

  responsiveOptions: any[] = [];

  constructor(private carsService: CarsService) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.cars = this.carsService.getCars().slice(0, 10);
  }
}
