export interface CommonAppConfig {
  apiUrl: string;
  authServerUrl?: string;
  authRedirectOrigin?: string;
  production: boolean;
}

export interface IAppConfigService<T> {
  setAppConfig(): void;
  getConfig(): T;
}
