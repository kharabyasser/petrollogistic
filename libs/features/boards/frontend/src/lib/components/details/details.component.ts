import { Component } from '@angular/core';
import { DeliveryRequestsFacade } from '../../+state/delivery-requests-facade';
import { DeliveryRequest } from '../../domain/deliveryrequest';

@Component({
  selector: 'petrologistic-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  deliveryRequests: DeliveryRequest[] = [];
  selectedDeliveryRequests: DeliveryRequest[] = [];

  selectedCoordinates: number[][] = [];

  approxDrivingDistance = 0;
  approxDrivingDuration = '';
  selectedRequestsCount = 0;

  basicData: any;

  horizontalOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#FFFFFF'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#FFFFFF'
        }
      }
    }
  };

  constructor(private deliveriesFacade: DeliveryRequestsFacade) {
    this.deliveriesFacade.deliveryRequests$.subscribe(deliveries => this.deliveryRequests = deliveries);

    this.deliveriesFacade.selectedRequests$
      .subscribe(ids => {
        this.selectedDeliveryRequests = this.deliveryRequests.filter(d => ids.includes(d.id));
        this.selectedCoordinates = this.selectedDeliveryRequests.flatMap(d => d.destinationContainers.map(c => [c.longtitude, c.latitude]));
        this.selectedRequestsCount = ids.length;

        const productsData = this.selectedDeliveryRequests
        .flatMap(r => r.destinationContainers.map(c => ({
          label: c.product.description,
          amount: c.requestedAmount,
          color: c.requestedAmount > 1500 ? '#FF0049' : '#33C4FF'
        })));

        this.basicData = {
          labels: productsData.map(d => d.label),
          datasets: [
            {
              backgroundColor: productsData.map(d => d.color),
              borderColor: productsData.map(d =>  d.color),
              data: productsData.map(d => d.amount),
              maxBarThickness: 30,
              borderWidth: 1
            }
          ]
        };
      });
  }

  onDistanceCalculated(distance: number) {
    this.approxDrivingDistance = distance;
  }

  onDurationCalculated(duration: number) {
    if (duration === 0) {
      this.approxDrivingDuration = '';
      return;
    }

    this.approxDrivingDuration = new Date(duration * 1000).toISOString().slice(11, 16).replace(':', 'h') + 'm';
  }
}
