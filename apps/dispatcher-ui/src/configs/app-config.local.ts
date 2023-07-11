import { AppConfig } from "../models/app-config.model";
import { APP_CONFIG_BASE } from "./app-config.base";

export const APP_CONFIG_LOCAL: AppConfig = {
  ...APP_CONFIG_BASE,

  environmentName: 'local',
  production: false,
  showDevFeature: true,
  authServerUrl: "",
  authRedirectOrigin: "",
  apiUrl: 'http://localhost:5188/graphql/',
  openRoutingServiceApiUrl: "http://localhost:8080/ors/v2/",
  vrpServiceApiUrl: "http://localhost:3000/"
};
