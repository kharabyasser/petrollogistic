import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { DirectionsRequest } from "../models/routing/directions-request";
import { IsochronesRequest } from "../models/routing/isochrones-request";
import { PETROLOGISTIC_DISPATCHER_CONFIG, PetrologisticDispatcherConfig } from "@petrologistic/core/frontend/dispatcher-data-access";

@Injectable()
export class RoutingService {

    constructor(private http: HttpClient,
        @Inject(PETROLOGISTIC_DISPATCHER_CONFIG) private apiConfig: PetrologisticDispatcherConfig) { }

    getDirections(body: DirectionsRequest) {
        return this.http.post<GeoJSON.GeoJSON>(`${this.apiConfig.openRoutingServiceApiUrl}/directions/driving-car/geojson`, body);
    }

    getIsochrone(body: IsochronesRequest) {
        return this.http.post<GeoJSON.GeoJSON>(`${this.apiConfig.openRoutingServiceApiUrl}/isochrones/driving-car`, body);
    }
}