import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PPanelChildComponent } from './components/p-panel-child.component';
import { PanelModule } from 'primeng/panel';


@NgModule({
  imports: [
    CommonModule,
    PanelModule
  ],
  declarations: [
    PPanelChildComponent
  ],
  exports: [PPanelChildComponent],
})
export class CoreFrontendPPanelChildModule {}
