import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardsComponent } from './components/boards/boards.component';
import { TableLayoutComponent } from './components/layouts/table-layout/table-layout.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CarsService } from './services/cars-service';


@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    MultiSelectModule,
    FormsModule,
  ],
  declarations: [
    BoardsComponent,
    TableLayoutComponent,
  ],
  exports: [TableLayoutComponent],
  providers: [CarsService]
})
export class BoardsModule {}
