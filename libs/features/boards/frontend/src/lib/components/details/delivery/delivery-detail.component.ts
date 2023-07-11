import { Component, OnInit } from '@angular/core';
import { DeliveryRequestsFacade } from '../../../+state/delivery-requests/delivery-requests-facade';
import { MapsFacade } from '../../../+state/maps/maps-facade';
import { DeliveryRequest } from '../../../domain/deliveryrequest';
import { Feature, GeoJsonProperties, Point } from 'geojson';

@Component({
  selector: 'petrologistic-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: ['./delivery-detail.component.scss'],
})
export class DetailsComponent implements OnInit {
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

      const selectedeliveriesFeatures = this.selectedDeliveryRequests.map((d) => {
        const features: Feature<Point, GeoJsonProperties> = {
          type: 'Feature',
          properties: {
            tag: 'delivery',
            symbol: d.purchaseOrder.toString()
          },
          geometry: {
            type: 'Point',
            coordinates: [d.shipToAccount.longitude, d.shipToAccount.latitude],
          },
        };

        return features;
      });

      this.mapsFacade.replaceMarkers(selectedeliveriesFeatures);

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

  ngOnInit(): void {
    this.mapsFacade.clear();
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
