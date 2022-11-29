import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { DeliveryRequestsFacade } from '../../+state/delivery-requests-facade';

@Component({
  selector: 'petrologistic-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit, OnDestroy {

  map: Map | undefined;
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  constructor(private deliveriesFacade: DeliveryRequestsFacade) {
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

    new Marker({color: "#FF0000"})
    .setLngLat([initialState.lng, initialState.lat])
    .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
