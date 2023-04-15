import { Component, Input, OnInit } from '@angular/core';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { TrucksFacade } from '../../../+state/trucks/trucks-facade';
import { Truck } from '../../../domain/truck';
import { Coordinate } from '../../../models/maps/coordinate';
import { RoutingService } from '../../../services/routing-service';

@Component({
  selector: 'petrologistic-truck-detail',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss'],
})
export class TruckComponent implements OnInit {
  @Input() liteMode = false;

  trucks: Truck[] = [];

  productsData: any;
  liteModeProductsData: any;

  miniTicketsView = true;
  chartsCollapsed = false;
  hideCharts = false;

  horizontalOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
        },
      },
    },
  };

  liteModehorizontalOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      legend: {
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
          drawBorder: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#ebedef',
          drawBorder: false,
        },
      },
    },
  };

  constructor(
    private trucksFacade: TrucksFacade,
    private mapsFacade: MapsFacade,
    private routingService: RoutingService
  ) {
    this.trucksFacade.trucks$.subscribe((trucks) => (this.trucks = trucks));

    this.productsData = {
      labels: ['product1', 'product2', 'product3'],
      datasets: [
        {
          label: 'In truck',
          data: [1000, 900, 1050],
          backgroundColor: '#33C4FF',
          borderColor: 'blue',
          maxBarThickness: 30,
          borderWidth: 1,
        },
        {
          label: 'Total to deliver',
          data: [1500, 600, 950],
          backgroundColor: '#FF0049',
          borderColor: 'blue',
          maxBarThickness: 30,
          borderWidth: 1,
        },
      ],
    };

    this.liteModeProductsData = {
      labels: ['In truck'],
      datasets: [
        {
          type: 'bar',
          label: 'Product 1',
          backgroundColor: '#eba834',
          borderColor: 'blue',
          data: [1000, 900, 1050],
        },
        {
          type: 'bar',
          label: 'Product 2',
          backgroundColor: '#3440eb',
          borderColor: 'blue',
          data: [900, 1050],
        },
        {
          type: 'bar',
          label: 'Product 3',
          backgroundColor: '#FF0d80',
          borderColor: 'blue',
          data: [1050],
        },
      ],
    };
  }

  ngOnInit(): void {
    this.trucksFacade.loadTrucks();
  }

  onBeforeToggle() {
    if (this.chartsCollapsed) this.hideCharts = false;
  }

  onAfterToggle() {
    this.hideCharts = this.chartsCollapsed;
  }

  locate(truck: Truck) {
    this.mapsFacade.centerOn(new Coordinate(truck.longtitude, truck.latitude));
  }

  isochrone(truck: Truck) {
    const ranges: number[] = [];
    for (let i = 1200; i >= 0; i -= 200) {
      ranges.push(i);
    }

    this.routingService
      .getIsochrone({
        locations: [[truck.longtitude, truck.latitude]],
        range: ranges,
      })
      .subscribe((x) => {
        this.mapsFacade.addIsochroneData(x);
      });
  }
}
