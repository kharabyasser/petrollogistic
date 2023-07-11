import { CommonAppConfig } from "@petrologistic/core/frontend/config"
 
export interface AppConfig extends CommonAppConfig {
  theme?: string;
  environmentName?: string;
  showDevFeature: boolean;
  openRoutingServiceApiUrl: string;
  vrpServiceApiUrl: string;
}
