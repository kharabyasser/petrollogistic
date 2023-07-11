import { Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  PETROLOGISTIC_DISPATCHER_CONFIG,
  PetrologisticDispatcherConfig,
} from '@petrologistic/core/frontend/dispatcher-data-access';

@NgModule({
  imports: [CommonModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink, appConfig: PetrologisticDispatcherConfig) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: appConfig.apiUrl,
          }),
        };
      },
      deps: [HttpLink, PETROLOGISTIC_DISPATCHER_CONFIG],
    },
  ],
})
export class CoreFrontendApolloModule {}
