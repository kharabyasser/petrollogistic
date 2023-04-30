import { Injectable } from '@angular/core';
import { Map, Marker, Popup } from 'maplibre-gl';
import { MapsFacade } from '../+state/maps/maps-facade';
import { MapMarker } from '../models/maps/map-marker';
import { RoutingMetric } from '../models/routing/enums/routing-metric';
import { RoutingUnit } from '../models/routing/enums/routing-unit';
import { MatrixResponse } from '../models/routing/matrix-response';
import { MatrixResult } from '../models/routing/matrix-result';
import { RoutingService } from './routing-service';
import { GeoJsonResponse } from '../models/routing/geojson-response';

@Injectable()
export class MapService {
  map!: Map;
  private markers: MapMarker[] = [];
  private currentMarkers!: Marker[];
  private fitBounds = false;

  private initialState = { lng: -73.62, lat: 45.5, zoom: 14 };
  private padding = 0.1;
  private colors = [
    '#f54242',
    '#f542ce',
    '#c542f5',
    '#7b42f5',
    '#2f47fa',
    '#2fa9fa',
  ];

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

      const orderedisochrones = JSON.parse(
        JSON.stringify(isochrones)
      ) as GeoJsonResponse;

      orderedisochrones.features.reverse();

      this.map.addSource('isochroneSource', {
        type: 'geojson',
        data: orderedisochrones,
      });

      this.map.addLayer({
        id: 'isochroneLayer',
        type: 'fill',
        source: 'isochroneSource',
        paint: {
          'fill-color': [
            'match',
            ['get', 'value'],
            200,
            this.colors[0],
            400,
            this.colors[1],
            600,
            this.colors[2],
            800,
            this.colors[3],
            1000,
            this.colors[4],
            1200,
            this.colors[5],
            '#000000',
          ],
          'fill-outline-color': 'rgb(255, 255, 255)',
          'fill-opacity': 0.3,
        },
      });
    });

    this.mapsFacade.routes$.subscribe((routes) => {
      let attempts = 0;
      const checkLoaded = setInterval(() => {
        attempts++;
        if (this.map.loaded() || attempts >= 3) {
          clearInterval(checkLoaded);
          if (!this.map.loaded()) {
            return;
          }

          if (this.map.getSource('routesSource')) {
            this.map.removeLayer('routesLayer');
            this.map.removeSource('routesSource');
          }

          let index = 0;
          routes.forEach(r => {
            const routesJson = JSON.parse(
              JSON.stringify(r)
            ) as GeoJsonResponse;
  
            this.map.addSource(`routesSource_${index}`, {
              type: 'geojson',
              data: routesJson,
            });
  
            this.map.addLayer({
              id: `routesLayer_${index}`,
              type: 'line',
              source: `routesSource_${index}`,
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': this.colors[index],
                'line-width': 3,
              },
            });

            ++index;
          })

          this.map.fitBounds([
            [routes[0].bbox[0], routes[0].bbox[1]],
            [routes[0].bbox[2], routes[0].bbox[3]],
          ]);
        }
      }, 1000);
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
