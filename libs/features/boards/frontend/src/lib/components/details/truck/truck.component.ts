import { Component, OnInit } from '@angular/core';
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
  trucks: Truck[] = [];

  productsData: any;

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
    for (let i = 700; i >= 0; i -= 100) {
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
