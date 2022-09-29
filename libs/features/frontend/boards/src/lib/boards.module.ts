import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  declarations: [BoardsComponent],
  exports: [BoardsComponent]
})
export class BoardsModule {}
