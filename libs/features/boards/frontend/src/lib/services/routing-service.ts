import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DirectionsRequest } from "../domain/routing/directions-request";
import { MatrixRequest } from "../domain/routing/matrix-request";
import { MatrixResponse } from "../domain/routing/matrix-response";
import { environment } from '@env/*';


@Injectable()
export class RoutingService {

    constructor(private http: HttpClient) { }

    getMatrix(body: MatrixRequest) {
        return this.http.post<MatrixResponse>(`${environment.openroutingserviceapi}/matrix/driving-car`, body);
    }

    getDirections(body: DirectionsRequest) {
        return this.http.post<any>(environment.openroutingserviceapi, body);
    }
}