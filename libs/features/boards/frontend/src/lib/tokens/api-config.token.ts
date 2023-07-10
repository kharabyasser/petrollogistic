import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  apiUrl: string;
  openRoutingServiceApiUrl: string
  vrpServiceApiUrl: string
}

export const PETROLOGISTIC_API_CONFIG = new InjectionToken<ApiConfig>('PETROLOGISTIC_API_CONFIG');
