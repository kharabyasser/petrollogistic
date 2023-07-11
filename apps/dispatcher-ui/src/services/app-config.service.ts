import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config.model';
import { APP_CONFIG_LOCAL } from '../configs/app-config.local';

@Injectable()
export class AppConfigService {
  private _appConfig!: AppConfig;

  constructor() {
    this.setAppConfig();
  }

  setAppConfig(): void {
    const hostname = window.location.hostname;

    switch (hostname) {
      case 'localhost':
        this._appConfig = APP_CONFIG_LOCAL;
        break;
      default:
        this._appConfig = APP_CONFIG_LOCAL;
        break;
    }
  }

  getConfig(): AppConfig {
    return this._appConfig;
  }

  getApiUrl(): string {
    return this._appConfig.apiUrl;
  }

  getVrpServiceUrl(): string {
    return this._appConfig.vrpServiceApiUrl;
  }

  getRoutingServiceUrl(): string {
    return this._appConfig.openRoutingServiceApiUrl;
  }
}
