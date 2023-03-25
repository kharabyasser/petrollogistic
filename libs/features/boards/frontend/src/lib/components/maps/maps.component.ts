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
import { MapMarker } from '../../models/maps/map-marker';
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

  @Input() markers!: MapMarker[];
  @Input() positionToCenter: number[] = [];

  @Output() approxDrivingDistanceEvent = new EventEmitter<number>();
  @Output() approxDrivingTimeEvent = new EventEmitter<number>();

  initialState = { lng: 139.7525, lat: 35.6846, zoom: 14 };

  constructor(private routingService: RoutingService) {}

  ngAfterViewInit() {
    if (this.map == null) {
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=9GLc7lJKzQasVymrF28T`,
        zoom: this.initialState.zoom,
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
    this.markers.forEach((c) => {
      if (!c.icon) {
        const marker = new Marker({ color: c.color }).setLngLat([
          c.longitude,
          c.latitude,
        ]);
        this.currentMarkers.push(marker);
        marker.addTo(this.map);
      } else {
        const icon = document.createElement('div');
        icon.style.width = '38px';
        icon.style.height = '38px';
        icon.style.backgroundSize = 'contain';
        icon.style.backgroundImage = `url("assets/truck.png")`;
        icon.style.cursor = 'pointer';

        const marker = new Marker(icon, {
          anchor: 'bottom',
          offset: [0, 5],
        }).setLngLat([c.longitude, c.latitude]);
        this.currentMarkers.push(marker);
        marker.addTo(this.map);
      }
    });

    // Fiting all markers bounds.
    const padding = 0.1;

    if (this.positionToCenter) {
      this.map.fitBounds([
        [
          this.positionToCenter[0] + padding,
          this.positionToCenter[1] + padding,
        ],
        [
          this.positionToCenter[0] - padding,
          this.positionToCenter[1] - padding,
        ],
      ]);
    } else {
      if (this.markers.length > 0) {
        this.map.fitBounds([
          [
            Math.max(...this.markers.map((x) => x.longitude)) + padding,
            Math.max(...this.markers.map((x) => x.latitude)) + padding,
          ],
          [
            Math.min(...this.markers.map((x) => x.longitude)) - padding,
            Math.min(...this.markers.map((x) => x.latitude)) - padding,
          ],
        ]);
      }
    }
  }

  // public getMetrix() {
  //   // Calculating matrix.
  //   if (this.markers.length > 1) {
  //     this.routingService
  //       .getMatrix({
  //         locations: this.markers.map((x) => [x.longitude, x.latitude]),
  //         metrics: [RoutingMetric.distance, RoutingMetric.duration],
  //         units: RoutingUnit.km,
  //       })
  //       .subscribe((x) => {
  //         this.approxDrivingDistanceEvent.emit(
  //           Math.max(
  //             ...x.distances.map((a) =>
  //               a.reduce((partialsum, d) => partialsum + d, 0)
  //             )
  //           )
  //         );
  //         this.approxDrivingTimeEvent.emit(
  //           ...x.durations.map((a) =>
  //             a.reduce((partialsum, d) => partialsum + d, 0)
  //           )
  //         );
  //       });
  //   } else {
  //     this.approxDrivingDistanceEvent.emit(0);
  //     this.approxDrivingTimeEvent.emit(0);
  //   }
  // }

  addIsochrones() {
    // Adding Isochrones.
    // this.map.on('load', () => {
    //   this.map.addSource('isochrones', {
    //     type: 'geojson',
    //     data: {},
    //   });
    //   this.map.addLayer({
    //     id: 'isochrones',
    //     type: 'fill',
    //     source: 'isochrones',
    //     paint: {
    //       'fill-color': '#088',
    //       'fill-opacity': 0.2,
    //     },
    //   });
    // });
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
