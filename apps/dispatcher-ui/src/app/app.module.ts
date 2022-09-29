import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesFrontendBoardsModule } from '../../../../libs/features/frontend/boards/src/lib/features-frontend-boards.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, FeaturesFrontendBoardsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
