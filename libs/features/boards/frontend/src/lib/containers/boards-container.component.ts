import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'petrologistic-boards-container',
  templateUrl: './boards-container.component.html',
  styleUrls: ['./boards-container.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        width: '80%'
      })),
      state('out', style({
        width: '100%'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})
export class BoardsContainerComponent {
  menuState = '';

  constructor() {
    this.menuState = 'in';
  }

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
