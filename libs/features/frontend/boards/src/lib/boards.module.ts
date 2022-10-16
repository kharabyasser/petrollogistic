import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardsComponent } from './components/boards/boards.component';
import { CarouselDetailComponent } from './components/details/carousel-detail/carousel-detail.component';
import { TableLayoutComponent } from './components/layouts/table-layout/table-layout.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CarsService } from './services/cars-service';


@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    MultiSelectModule,
    FormsModule,
    CarouselModule,
  ],
  declarations: [
    BoardsComponent,
    TableLayoutComponent,
    CarouselDetailComponent,
  ],
  exports: [TableLayoutComponent],
  providers: [CarsService]
})
export class BoardsModule {}
