import { NgModule } from '@angular/core';
import { BoardsComponent } from './components/boards/boards.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [TableModule, ButtonModule, InputTextModule],
  declarations: [BoardsComponent],
  exports: [BoardsComponent]
})
export class BoardsModule { }
