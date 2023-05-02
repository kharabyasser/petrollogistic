import { Injectable } from '@angular/core';
import { GeoJSONSource, Map } from 'maplibre-gl';
import { MapsFacade } from '../+state/maps/maps-facade';
import { MapMarker } from '../models/maps/map-marker';
import { RoutingMetric } from '../models/routing/enums/routing-metric';
import { RoutingUnit } from '../models/routing/enums/routing-unit';
import { MatrixResponse } from '../models/routing/matrix-response';
import { MatrixResult } from '../models/routing/matrix-result';
import { RoutingService } from './routing-service';
import { FeatureCollection, GeoJsonProperties, Polygon } from 'geojson';

@Injectable()
export class MapService {
  map!: Map;
  private currentMarkersLayers: string[] = [];
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

    const imageDelivery = document.createElement('img');
    imageDelivery.width = 25;
    imageDelivery.height = 25;
    imageDelivery.src = '../assets/delivery.png';

    const imageTruck = document.createElement('img');
    imageTruck.width = 25;
    imageTruck.height = 25;
    imageTruck.src = '../assets/truck.png';

    this.map.on('load', () => {
      if (!this.map.hasImage('delivery-icon')) {
        this.map.addImage('delivery-icon', imageDelivery);
      }

      if (!this.map.hasImage('truck-icon')) {
        this.map.addImage('truck-icon', imageTruck);
      }
    });

    this.mapsFacade.markersOnMap$.subscribe((markersFeatures) => {
      // delete previous layers
      this.currentMarkersLayers.forEach((l) => this.map.removeLayer(l));
      this.currentMarkersLayers = [];

      if (markersFeatures.length > 0) {
        const markers: GeoJSON.GeoJSON = {
          type: 'FeatureCollection',
          features: markersFeatures,
          bbox: [
            Math.max(...markersFeatures.map((x) => x.geometry.coordinates[0])) +
              this.padding,
            Math.max(...markersFeatures.map((x) => x.geometry.coordinates[1])) +
              this.padding,
            Math.min(...markersFeatures.map((x) => x.geometry.coordinates[0])) -
              this.padding,
            Math.min(...markersFeatures.map((x) => x.geometry.coordinates[1])) -
              this.padding,
          ],
        };

        const sourceName = `mapMarkers_source`;
        const source = this.map.getSource(sourceName) as GeoJSONSource;
        if (source) {
          source.setData(markers);
        } else {
          this.map.addSource(sourceName, {
            type: 'geojson',
            data: markers,
          });
        }

        markers.features.forEach((feature) => {
          const symbol =
            feature.properties !== null ? feature.properties['symbol'] : '';
          const id =
            feature.properties !== null ? feature.properties['value'] : '';
          const tag =
            feature.properties !== null ? feature.properties['tag'] : '';
          const layerID = 'tag-' + symbol + '-' + id;

          if (!this.map.getLayer(layerID)) {
            this.map.addLayer({
              id: layerID,
              type: 'symbol',
              source: sourceName,
              layout: {
                'icon-image': tag === 'delivery' ? 'delivery-icon' : 'truck-icon',
                'icon-overlap': 'always',
                'text-field': symbol,
                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                'text-size': 11,
                'text-transform': 'uppercase',
                'text-letter-spacing': 0.05,
                'text-offset': [0, 1.5],
              },
              paint: {
                'text-color': '#202',
                'text-halo-color': '#fff',
                'text-halo-width': 2,
              },
              filter: ['==', 'symbol', symbol],
            });
            this.currentMarkersLayers.push(layerID);
          }
        });

        if (markers.bbox) {
          this.map.fitBounds([
            markers.bbox[0],
            markers.bbox[1],
            markers.bbox[2],
            markers.bbox[3],
          ]);
        }
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
      ) as FeatureCollection<Polygon, GeoJsonProperties> ;

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
          routes.forEach((r) => {
            const routesJson = JSON.parse(JSON.stringify(r)) as  GeoJSON.GeoJSON;

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
          });

          if (routes[0].bbox) {
            this.map.fitBounds([
              [routes[0].bbox[0], routes[0].bbox[1]],
              [routes[0].bbox[2], routes[0].bbox[3]],
            ]);
          }
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
