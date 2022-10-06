import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';

@NgModule({
  imports: [CommonModule,
    FormsModule
  ],
  declarations: [BoardsComponent],
  exports: [BoardsComponent]
})
export class BoardsModule { }
