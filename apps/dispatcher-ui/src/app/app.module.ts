import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardsModule } from '../../../../libs/features/frontend/boards/src/lib/boards.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, BoardsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
