import { Component, OnInit } from '@angular/core';
import { TrucksFacade } from '../../../../+state/trucks/trucks-facade';
import { Truck } from '../../../../domain/truck';
import { MapsFacade } from '../../../../+state/maps/maps-facade';
import { map } from 'rxjs';
import { MapMarker } from '../../../../models/maps/map-marker';
import { Coordinate } from '../../../../models/maps/coordinate';

@Component({
  selector: 'petrologistic-quick-dispatch-truck',
  templateUrl: './quick-dispatch.truck.html',
  styleUrls: ['./quick-dispatch.truck.scss'],
})
export class QuickDispatchTruckComponent implements OnInit {
  trucks: Truck[] = [];
  returnSites = ['NAN', 'Deopt #1', 'Depot #2', 'Depot #3'];
  atoModes = ['Optimize', 'Forced', 'Custom'];

  productsData: any;

  miniTicketsView = true;
  chartsCollapsed = false;
  hideCharts = false;

  horizontalOptions = {
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
    private mapsFacade: MapsFacade
  ) {
    this.trucksFacade.trucks$.subscribe((trucks) => {
      this.trucks = trucks;
      this.trucks.forEach((t) => this.addToOptimizationVehicules(t));
    });

    this.productsData = {
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

  selectTruck(checked: boolean, truck: Truck) {
    if (checked) {
      this.addToOptimizationVehicules(truck);
    } else {
      this.mapsFacade.removeOptimizationVehicule(truck.number);
    }
  }

  addToOptimizationVehicules(truck: Truck) {
    this.mapsFacade.addOptimizationVehicule({
      id: truck.number,
      profile: 'driving-car',
      start: [truck.longtitude, truck.latitude],
    });
  }
}
