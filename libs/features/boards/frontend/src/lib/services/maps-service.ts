import { Injectable } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';
import { MapsFacade } from '../+state/maps/maps-facade';
import { MapMarker } from '../models/maps/map-marker';
import { RoutingMetric } from '../models/routing/enums/routing-metric';
import { RoutingUnit } from '../models/routing/enums/routing-unit';
import { MatrixResponse } from '../models/routing/matrix-response';
import { MatrixResult } from '../models/routing/matrix-result';
import { RoutingService } from './routing-service';

@Injectable()
export class MapService {
  map!: Map;
  private markers: MapMarker[] = [];
  private currentMarkers!: Marker[];
  private fitBounds = false;

  private initialState = { lng: -73.62, lat: 45.5, zoom: 14 };
  private padding = 0.1;
  private colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0'];

  constructor(
    private mapsFacade: MapsFacade,
    private routingService: RoutingService
  ) {
    const mapContainer = document.createElement('div');
    mapContainer.classList.add('map');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '100%';

    this.map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=9GLc7lJKzQasVymrF28T`,
      zoom: this.initialState.zoom,
      center: [this.initialState.lng, this.initialState.lat],
      attributionControl: false,
    });

    this.mapsFacade.markersOnMap$.subscribe((mapMarkers) => {
      this.markers = mapMarkers;
      // Cleaning old markers.
      this.currentMarkers?.forEach((m) => m.remove());
      this.currentMarkers = [];

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

      // Fit bounds.
      if (this.fitBounds && this.markers.length > 0) {
        setTimeout(() => {
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
        }, 0);
      }
    });

    this.mapsFacade.centerOnPosition$.subscribe((position) => {
      this.fitBounds = position === null;
      if (position) {
        this.map.fitBounds([
          [position.longitude + this.padding, position.latitude + this.padding],
          [position.longitude - this.padding, position.latitude - this.padding],
        ]);
      }
    });

    this.mapsFacade.isochroneData$.subscribe((isochrones) => {
      if (!this.map.loaded()) {
        return;
      }

      if (this.map.getSource('isochroneSource')) {
        this.map.removeLayer('isochroneLayer');
        this.map.removeSource('isochroneSource');
      }

      this.map.addSource('isochroneSource', {
        type: 'geojson',
        data: isochrones,
      });

      this.map.addLayer({
        id: 'isochroneLayer',
        type: 'fill',
        source: 'isochroneSource',
        paint: {
          'fill-color': [
            'match',
            ['get', 'value'],
            100, this.colors[0],
            200, this.colors[1],
            300, this.colors[2],
            400, this.colors[3],
            500, this.colors[4],
            600, this.colors[5],
            700, this.colors[6],
            '#FFFFFF' // Default color if the value doesn't match any of the above
          ],
          'fill-outline-color': 'rgba(255, 0, 0, 0)',
          'fill-opacity': 0.5,
        },
      });
    });
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
          matrixResults.distance = Math.max(
            ...x.distances.map((a) =>
              a.reduce((partialsum, d) => partialsum + d, 0)
            )
          );

          matrixResults.duration = Math.max(
            ...x.durations.map((a) =>
              a.reduce((partialsum, d) => partialsum + d, 0)
            )
          );
        });
    } else {
      matrixResults.distance = 0.0;
      matrixResults.duration = 0.0;
    }

    return matrixResults;
  }
}
