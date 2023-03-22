import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { RoutingMetric } from '../../domain/routing/enums/routing-metric';
import { RoutingUnit } from '../../domain/routing/enums/routing-unit';
import { RoutingService } from '../../services/routing-service';

@Component({
  selector: 'petrologistic-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit, OnDestroy, OnChanges {
  map!: Map;
  currentMarkers!: Marker[];
  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  @Input() deliveriesCoordinates!: number[][];

  @Output() approxDrivingDistanceEvent = new EventEmitter<number>();
  @Output() approxDrivingTimeEvent = new EventEmitter<number>();

  constructor(private routingService: RoutingService) {}

  ngAfterViewInit() {
    const initialState = { lng: 139.7525, lat: 35.6846, zoom: 14 };

    if (this.map == null) {
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=9GLc7lJKzQasVymrF28T`,
        zoom: initialState.zoom,
        attributionControl: false,
      });

      this.ngOnChanges();
    }
  }

  ngOnChanges() {
    // Cleaning old markers.
    this.currentMarkers?.forEach((m) => m.remove());
    this.currentMarkers = [];

    if (this.map == null) {
      return;
    }

    // Adding new markers.
    this.deliveriesCoordinates.forEach((c) => {
      const marker = new Marker({ color: '#FF0000' }).setLngLat([c[0], c[1]]);
      this.currentMarkers.push(marker);
      marker.addTo(this.map);
    });

    // Fiting all markers bounds.
    const padding = 0.1;
    this.map.fitBounds([
      [
        Math.max(...this.deliveriesCoordinates.map((x) => x[0])) + padding,
        Math.max(...this.deliveriesCoordinates.map((x) => x[1])) + padding,
      ],
      [
        Math.min(...this.deliveriesCoordinates.map((x) => x[0])) - padding,
        Math.min(...this.deliveriesCoordinates.map((x) => x[1])) - padding,
      ],
    ]);

    // Calculating matrix.
    if (this.deliveriesCoordinates.length > 1) {
      this.routingService
        .getMatrix({
          locations: this.deliveriesCoordinates,
          metrics: [RoutingMetric.distance, RoutingMetric.duration],
          units: RoutingUnit.km,
        })
        .subscribe((x) => {
          this.approxDrivingDistanceEvent.emit(
            Math.max(
              ...x.distances.map((a) =>
                a.reduce((partialsum, d) => partialsum + d, 0)
              )
            )
          );
          this.approxDrivingTimeEvent.emit(
            ...x.durations.map((a) =>
              a.reduce((partialsum, d) => partialsum + d, 0)
            )
          );
        });
    } else {
      this.approxDrivingDistanceEvent.emit(0);
      this.approxDrivingTimeEvent.emit(0);
    }

    // Adding Isochrones.
    this.map.on('load', () => {
      this.map.addSource('isochrones', {
        type: 'geojson',
        data: {},
      });

      this.map.addLayer({
        id: 'isochrones',
        type: 'fill',
        source: 'isochrones',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.2,
        },
      });
    });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
