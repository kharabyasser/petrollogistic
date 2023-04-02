import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { MapService } from '../../services/maps-service';

@Component({
  selector: 'petrologistic-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapsComponent implements AfterViewInit {
  @ViewChild('mapContainer') private mapContainer!: ElementRef<HTMLElement>;

  constructor(private mapService: MapService) {
  }
  
  ngAfterViewInit(): void {
    this.mapContainer.nativeElement.appendChild(
      this.mapService.map._container);

      this.mapService.map.resize();
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
}
