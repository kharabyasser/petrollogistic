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
  approxDrivingDuration = 0;

  constructor(private deliveriesFacade: DeliveryRequestsFacade) {
    this.deliveriesFacade.deliveryRequests$.subscribe(deliveries => this.deliveryRequests = deliveries);

    this.deliveriesFacade.selectedRequests$
      .subscribe(ids => {
        this.selectedDeliveryRequests = this.deliveryRequests.filter(d => ids.includes(d.id));

        this.selectedCoordinates = this.selectedDeliveryRequests .flatMap(d => d.destinationContainers.map(c => [c.longtitude, c.latitude]));
      });
  }

  onDistanceCalculated(distance: number) {
    this.approxDrivingDistance = distance;
  }

  onDurationCalculated(duration: number) {
    this.approxDrivingDuration = duration;
  }
}
