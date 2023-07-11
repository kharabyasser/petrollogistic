import { InjectionToken } from '@angular/core';

export interface PetrologisticDispatcherConfig {
  apiUrl: string;
  openRoutingServiceApiUrl: string
  vrpServiceApiUrl: string
}

export const PETROLOGISTIC_DISPATCHER_CONFIG = new InjectionToken<PetrologisticDispatcherConfig>('PETROLOGISTIC_DISPATCHER_CONFIG');
