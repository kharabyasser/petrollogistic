import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { VrpRequestDto } from "../models/routing/vrp-request";
import { VrpAssignment } from "../models/routing/vrp-assignment";
import { PETROLOGISTIC_DISPATCHER_CONFIG, PetrologisticDispatcherConfig } from "@petrologistic/core/frontend/dispatcher-data-access";


@Injectable()
export class VrpService {

    constructor(private http: HttpClient,
        @Inject(PETROLOGISTIC_DISPATCHER_CONFIG) private apiConfig: PetrologisticDispatcherConfig) { }

    optimize(body: VrpRequestDto) {
        return this.http.post<VrpAssignment>(`${this.apiConfig.vrpServiceApiUrl}routing/solve`, body);
    }
}