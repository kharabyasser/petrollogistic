import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { MapsFacade } from '../../+state/maps/maps-facade';
import { MapMarker } from '../../models/maps/map-marker';
import { RoutingMetric } from '../../models/routing/enums/routing-metric';
import { RoutingUnit } from '../../models/routing/enums/routing-unit';
import { MatrixResponse } from '../../models/routing/matrix-response';
import { MatrixResult } from '../../models/routing/matrix-result';
import { RoutingService } from '../../services/routing-service';

@Component({
  selector: 'petrologistic-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements AfterViewInit, OnDestroy, OnChanges {
  padding = 0.1;

  map!: Map;
  markers: MapMarker[] = [];
  currentMarkers!: Marker[];

  @ViewChild('map') private mapContainer!: ElementRef<HTMLElement>;

  initialState = { lng: 139.7525, lat: 35.6846, zoom: 14 };

  constructor(
    private routingService: RoutingService,
    private mapsFacade: MapsFacade
  ) {
    this.mapsFacade.markersOnMap$.subscribe((mapMarkers) => {
      this.markers = mapMarkers;
      // Adding new markers.
      mapMarkers.forEach((c) => {
        if (!c.icon) {
          const marker = new Marker({ color: c.color }).setLngLat([
            c.coordinate.longitude,
            c.coordinate.latitude,
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
          }).setLngLat([c.coordinate.longitude, c.coordinate.latitude]);
          this.currentMarkers.push(marker);
          marker.addTo(this.map);
        }
      });
    });

    this.mapsFacade.fitMarkersBound$.subscribe((fitBounds) => {
      if (fitBounds) {
        this.map.fitBounds([
          [
            Math.max(...this.markers.map((x) => x.coordinate.longitude)) +
              this.padding,
            Math.max(...this.markers.map((x) => x.coordinate.latitude)) +
              this.padding,
          ],
          [
            Math.min(...this.markers.map((x) => x.coordinate.longitude)) -
              this.padding,
            Math.min(...this.markers.map((x) => x.coordinate.latitude)) -
              this.padding,
          ],
        ]);
      }
    });

    this.mapsFacade.centerOnPosition$.subscribe((position) => {
      if (position) {
        this.map.fitBounds([
          [position.longitude + this.padding, position.latitude + this.padding],
          [position.longitude - this.padding, position.latitude - this.padding],
        ]);
      }
    });
  }

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
  }

  public getMetrix(markers: MapMarker[]): MatrixResult {
    const matrixResults = new MatrixResult();

    if (markers.length > 1) {
      this.routingService
        .getMatrix({
          locations: markers.map((x) => [
            x.coordinate.longitude,
            x.coordinate.latitude,
          ]),
          metrics: [RoutingMetric.distance, RoutingMetric.duration],
          units: RoutingUnit.km,
        })
        .subscribe((x: MatrixResponse) => {
          matrixResults.distance = 
            Math.max(
              ...x.distances.map((a) =>
                a.reduce((partialsum, d) => partialsum + d, 0)));
          
          matrixResults.duration =
            Math.max(
              ...x.durations.map((a) =>
                  a.reduce((partialsum, d) => partialsum + d, 0)));
        });
    } else {
      matrixResults.distance = 0.0;
      matrixResults.duration = 0.0;
    }

    return matrixResults;
  }

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
