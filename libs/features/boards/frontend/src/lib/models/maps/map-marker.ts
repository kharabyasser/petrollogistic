import { Coordinate } from './coordinate';

export class MapMarker {
  icon = '';
  color = '';
  coordinate: Coordinate;

  constructor(coordinate: Coordinate, icon?: string, color?: string) {
    this.icon = icon || '';
    this.color = color || '';
    this.coordinate = coordinate;
  }
}
