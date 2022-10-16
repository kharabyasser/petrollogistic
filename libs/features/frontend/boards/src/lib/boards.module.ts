import { NgModule } from '@angular/core';
import { BoardsComponent } from './components/boards/boards.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    MultiSelectModule,
    FormsModule,
  ],
  declarations: [BoardsComponent, DetailComponent],
  exports: [BoardsComponent],
})
export class BoardsModule {}
