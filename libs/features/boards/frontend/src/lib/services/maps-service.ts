import { Injectable } from '@angular/core';
import { GeoJSONSource, Map } from 'maplibre-gl';
import { MapsFacade } from '../+state/maps/maps-facade';
import { RoutingService } from './routing-service';
import { FeatureCollection, GeoJsonProperties, Polygon } from 'geojson';

@Injectable()
export class MapService {
  map!: Map;
  private currentMarkersLayers: string[] = [];
  private fitBounds = false;
  private routesCount = 0;

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

      this.map.addSource('empty', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      this.map.addLayer({
        id: 'z-index-1',
        type: 'symbol',
        source: 'empty',
      });

      this.map.addLayer(
        {
          id: 'z-index-0',
          type: 'symbol',
          source: 'empty',
        },
        'z-index-1'
      );
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
            this.map.addLayer(
              {
                id: layerID,
                type: 'symbol',
                source: sourceName,
                layout: {
                  // 'text-allow-overlap': true,
                  // 'text-ignore-placement': true,
                  // 'icon-allow-overlap': true,
                  // 'icon-ignore-placement': true,
                  'icon-image':
                    tag === 'delivery' ? 'delivery-icon' : 'truck-icon',
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
              },
              'z-index-1'
            );
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
      ) as FeatureCollection<Polygon, GeoJsonProperties>;

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
          if (!this.map.loaded() || routes.length == 0) {
            return;
          }

          if (this.map.getSource('routesSource')) {
            this.map.removeLayer('routesLayer');
            this.map.removeSource('routesSource');
          }

          routes.forEach((r) => {
            const routesJson = JSON.parse(JSON.stringify(r)) as GeoJSON.GeoJSON;

            this.map.addSource(`routesSource_${this.routesCount}`, {
              type: 'geojson',
              data: routesJson,
            });

            this.map.addLayer(
              {
                id: `routesLayer_${this.routesCount}`,
                type: 'line',
                source: `routesSource_${this.routesCount}`,
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round',
                },
                paint: {
                  'line-color': this.colors[this.routesCount],
                  'line-width': 5,
                },
              },
              'z-index-0'
            );

            this.routesCount++;
          });

         const padding = this.padding / 3;

          this.map.fitBounds([
            Math.min(...routes.map((r) => (r.bbox ? r.bbox[0] : 0))) -
              padding,
            Math.min(...routes.map((r) => (r.bbox ? r.bbox[1] : 0))) -
              padding,
            Math.max(...routes.map((r) => (r.bbox ? r.bbox[2] : 0))) -
              padding,
            Math.max(...routes.map((r) => (r.bbox ? r.bbox[3] : 0))) +
              padding,
          ]);
        }
      }, 1000);
    });
  }
}
