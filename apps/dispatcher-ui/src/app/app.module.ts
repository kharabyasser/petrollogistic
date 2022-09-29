import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardsModule } from '../../../../libs/features/frontend/boards/src/lib/boards.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, BoardsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
