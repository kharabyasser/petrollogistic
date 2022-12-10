import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http' 
import { HttpClientModule } from '@angular/common/http';
import { environment } from '@env/*';

@NgModule({
  imports: [CommonModule, ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.dispatchapi
          })
        }
      },
      deps: [HttpLink]
    }
  ],
})
export class CoreFrontendApolloModule {}
