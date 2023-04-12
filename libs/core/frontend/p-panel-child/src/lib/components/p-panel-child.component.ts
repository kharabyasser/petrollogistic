import { Component, Input } from '@angular/core';

@Component({
  selector: 'petrologistic-p-panel-child',
  templateUrl: './p-panel-child.component.html',
  styleUrls: ['./p-panel-child.component.scss']
})
export class PPanelChildComponent {
  @Input() title = "";
  @Input() collapsed = false;

  hideContent = false;

  onBeforeToggle() {
    if (this.collapsed) this.hideContent = false;
  }

  onAfterToggle() {
    this.hideContent = this.collapsed;
  }
}
