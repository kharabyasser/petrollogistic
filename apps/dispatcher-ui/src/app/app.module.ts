import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardsModule } from '@petrologistic/features/frontend/boards';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BoardsModule, BrowserAnimationsModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://localhost:7287/graphql'
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
