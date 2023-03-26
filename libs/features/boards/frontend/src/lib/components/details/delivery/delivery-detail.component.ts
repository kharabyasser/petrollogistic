import { Component } from '@angular/core';
import { DeliveryRequestsFacade } from '../../../+state/delivery-requests/delivery-requests-facade';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { DeliveryRequest } from '../../../domain/deliveryrequest';
import { Coordinate } from '../../../models/maps/coordinate';
import { MapMarker } from '../../../models/maps/map-marker';

@Component({
  selector: 'petrologistic-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss'],
})
export class DetailsComponent {
  deliveryRequests: DeliveryRequest[] = [];
  selectedDeliveryRequests: DeliveryRequest[] = [];

  approxDrivingDistance = 0;
  approxDrivingDuration = '';
  selectedRequestsCount = 0;

  productsData: any;

  horizontalOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#FFFFFF',
        },
      },
      y: {
        ticks: {
          color: '#495057',
        },
        grid: {
          color: '#FFFFFF',
        },
      },
    },
  };

  constructor(
    private deliveriesFacade: DeliveryRequestsFacade,
    private mapsFacade: MapsFacade
  ) {
    this.deliveriesFacade.deliveryRequests$.subscribe(
      (deliveries) => (this.deliveryRequests = deliveries)
    );

    this.deliveriesFacade.selectedRequests$.subscribe((ids) => {
      this.selectedDeliveryRequests = this.deliveryRequests.filter((d) =>
        ids.includes(d.id)
      );

      const selectedCoordinates = this.selectedDeliveryRequests.map(
        (d) =>
          new MapMarker(
            new Coordinate(
              d.shipToAccount.longtitude,
              d.shipToAccount.latitude
            ),
            undefined,
            '#FF0000'
          )
      );
      
      this.mapsFacade.addMarkers(selectedCoordinates);

      this.selectedRequestsCount = ids.length;

      const productsData = this.selectedDeliveryRequests.flatMap((r) =>
        r.destinationContainers.map((c) => ({
          label: c.product.description,
          amount: c.requestedAmount,
          color: c.requestedAmount > 1500 ? '#FF0049' : '#33C4FF',
        }))
      );

      this.productsData = {
        labels: productsData.map((d) => d.label),
        datasets: [
          {
            backgroundColor: productsData.map((d) => d.color),
            borderColor: productsData.map((d) => d.color),
            data: productsData.map((d) => d.amount),
            maxBarThickness: 30,
            borderWidth: 1,
          },
        ],
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

    this.approxDrivingDuration =
      new Date(duration * 1000).toISOString().slice(11, 16).replace(':', 'h') +
      'm';
  }
}
