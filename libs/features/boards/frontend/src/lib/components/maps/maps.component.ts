import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'petrologistic-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=9GLc7lJKzQasVymrF28T`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
