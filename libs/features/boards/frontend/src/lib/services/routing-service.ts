import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@env/*';
import { DirectionsRequest } from "../models/routing/directions-request";
import { IsochronesRequest } from "../models/routing/isochrones-request";

@Injectable()
export class RoutingService {

    constructor(private http: HttpClient) { }

    getDirections(body: DirectionsRequest) {
        return this.http.post<GeoJSON.GeoJSON>(`${environment.openroutingserviceapi}/directions/driving-car/geojson`, body);
    }

    getIsochrone(body: IsochronesRequest) {
        return this.http.post<GeoJSON.GeoJSON>(`${environment.openroutingserviceapi}/isochrones/driving-car`, body);
    }
}