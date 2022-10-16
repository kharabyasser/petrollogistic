import { NgModule } from '@angular/core';
import { BoardsComponent } from './components/boards/boards.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { TableLayoutComponent } from './components/layouts/table-layout/table-layout.component';
import { CarouselDetailComponent } from './components/details/carousel-detail/carousel-detail.component';

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
    CarouselDetailComponent,
  ],
  exports: [BoardsComponent],
})
export class BoardsModule {}
