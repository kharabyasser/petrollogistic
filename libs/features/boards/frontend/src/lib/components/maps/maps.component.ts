import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { map, Observable, of } from 'rxjs';
import { DeliveryRequestsFacade } from '../../+state/delivery-requests-facade';
import { DeliveryRequest } from '../../domain/deliveryrequest';

@Component({
  selector: 'petrologistic-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit, OnDestroy {

  map!: Map;
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  selectedDeliveries$: Observable<DeliveryRequest[]> = new Observable<DeliveryRequest[]>();
  deliveryRequests: DeliveryRequest[] = [];

  constructor(private deliveriesFacade: DeliveryRequestsFacade) {
    this.deliveriesFacade.deliveryRequests$.subscribe(deliveries => this.deliveryRequests = deliveries);

    this.deliveriesFacade.selectedRequests$
      .subscribe(ids => {
        const selectedDeliveries = this.deliveryRequests.filter(d => ids.includes(d.id));

        selectedDeliveries.forEach(d => {
          d.destinationContainers.forEach(container => {
            new Marker({ color: "#FF0000" })
              .setLngLat([container.longtitude, container.latitude])
              .addTo(this.map);
          });

          const allCoordinates = selectedDeliveries.map(d => d.destinationContainers.map(c => [c.longtitude, c.latitude]))[0];
          const padding = 0.1;

          this.map.fitBounds([
            [Math.max(...allCoordinates.map(x => x[0])) + padding, Math.max(...allCoordinates.map(x => x[1])) + padding],
            [Math.min(...allCoordinates.map(x => x[0])) - padding, Math.min(...allCoordinates.map(x => x[1])) - padding]
          ]);
        })
      });
  }

  ngAfterViewInit() {
    const initialState = { lng: 139.7525, lat: 35.6846, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=9GLc7lJKzQasVymrF28T`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
      attributionControl: false
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
