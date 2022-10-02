import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, DragDropModule],
  declarations: [BoardsComponent],
  exports: [BoardsComponent]
})
export class BoardsModule { }
