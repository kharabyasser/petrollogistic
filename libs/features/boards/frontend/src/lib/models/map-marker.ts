export class MapMarker {
    icon = "";
    color = "";
    longitude = 0.0;
    latitude = 0.0;

    constructor(longitude: number, latitude: number, icon?: string, color?: string) {
      this.icon = icon || "";
      this.color = color || "";
      this.longitude = longitude || 0.0;
      this.latitude = latitude || 0.0;
    }
  } 