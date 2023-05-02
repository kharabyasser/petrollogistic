import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@env/*';
import { DirectionsRequest } from "../models/routing/directions-request";
import { IsochronesRequest } from "../models/routing/isochrones-request";
import { MatrixRequest } from "../models/routing/matrix-request";
import { MatrixResponse } from "../models/routing/matrix-response";

@Injectable()
export class RoutingService {

    constructor(private http: HttpClient) { }

    getMatrix(body: MatrixRequest) {
        return this.http.post<MatrixResponse>(`${environment.openroutingserviceapi}/matrix/driving-car`, body);
    }

    getDirections(body: DirectionsRequest) {
        return this.http.post<any>(`${environment.openroutingserviceapi}/directions/driving-car/geojson`, body);
    }

    getIsochrone(body: IsochronesRequest) {
        return this.http.post<GeoJSON.GeoJSON>(`${environment.openroutingserviceapi}/isochrones/driving-car`, body);
    }
}