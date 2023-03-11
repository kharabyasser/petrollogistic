import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'petrologistic-truck-detail',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss'],
})
export class TruckComponent  {
  productsData: any;

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

  constructor() {
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

  onBeforeToggle() {
    if (this.chartsCollapsed) this.hideCharts = false;
  }

  onAfterToggle() {
    this.hideCharts = this.chartsCollapsed;
  }
}
