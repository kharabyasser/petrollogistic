import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardsModule } from '@petrologistic/features/frontend/boards';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { PETROLOGISTIC_DISPATCHER_CONFIG, PetrologisticDispatcherConfig } from '@petrologistic/core/frontend/dispatcher-data-access';
import { AppConfigService } from '../services/app-config.service';

const getApiUrl = (appConfig: AppConfigService): PetrologisticDispatcherConfig => {
  return {
    apiUrl: appConfig.getApiUrl(),
    openRoutingServiceApiUrl: appConfig.getRoutingServiceUrl(),
    vrpServiceApiUrl: appConfig.getVrpServiceUrl()
  };
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    BoardsModule, 
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    AppConfigService,
    {
      provide: PETROLOGISTIC_DISPATCHER_CONFIG,
      useFactory: getApiUrl,
      multi: false,
      deps: [AppConfigService]
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
