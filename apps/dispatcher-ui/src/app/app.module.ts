import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardsModule } from '@petrologistic/features/frontend/boards';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BoardsModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
