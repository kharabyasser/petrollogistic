import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@env/*';
import { VrpRequest } from "../models/routing/vrp-request";
import { VrpResult } from "../models/routing/vrp-result";


@Injectable()
export class VrpService {

    constructor(private http: HttpClient) { }

    optimize(body: VrpRequest) {
        return this.http.post<VrpResult>(`${environment.vroomserviceapi}`, body);
    }
}