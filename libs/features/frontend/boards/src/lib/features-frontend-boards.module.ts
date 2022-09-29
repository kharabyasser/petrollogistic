import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsComponent } from './components/boards/boards.component';

@NgModule({
  imports: [CommonModule],
  declarations: [BoardsComponent],
  exports: [BoardsComponent]
})
export class FeaturesFrontendBoardsModule {}
