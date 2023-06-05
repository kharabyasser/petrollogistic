import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@env/*';
import { VrpRequest } from "../models/routing/vrp-request";
import { VrpAssignment } from "../models/routing/vrp-assignment";


@Injectable()
export class VrpService {

    constructor(private http: HttpClient) { }

    optimize(body: VrpRequest) {
        return this.http.post<VrpAssignment>(`${environment.vrpserviceapi}routing/solve`, body);
    }
}