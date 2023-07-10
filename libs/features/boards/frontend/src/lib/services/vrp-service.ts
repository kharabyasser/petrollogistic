import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { VrpRequest } from "../models/routing/vrp-request";
import { VrpAssignment } from "../models/routing/vrp-assignment";
import { ApiConfig, PETROLOGISTIC_API_CONFIG } from "../tokens/api-config.token";


@Injectable()
export class VrpService {

    constructor(private http: HttpClient,
        @Inject(PETROLOGISTIC_API_CONFIG) private apiConfig: ApiConfig) { }

    optimize(body: VrpRequest) {
        return this.http.post<VrpAssignment>(`${this.apiConfig.vrpServiceApiUrl}routing/solve`, body);
    }
}