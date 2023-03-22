import { Component, Input } from '@angular/core';

@Component({
  selector: 'petrologistic-p-panel-child',
  templateUrl: './p-panel-child.component.html',
  styleUrls: ['./p-panel-child.component.scss']
})
export class PPanelChildComponent {
  @Input() title = "";

  contentCollapsed = false;
  hideContent = false;

  onBeforeToggle() {
    if (this.contentCollapsed) this.hideContent = false;
  }

  onAfterToggle() {
    this.hideContent = this.contentCollapsed;
  }
}
