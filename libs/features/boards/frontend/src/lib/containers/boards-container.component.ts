import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DeliveryRequestsFacade } from '../+state/delivery-requests-facade';

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
  detailsState = '';
  detailsvisible = true;

  constructor(private deliveriesFacade: DeliveryRequestsFacade) {
    this.deliveriesFacade.selectedRequests$.subscribe(x => 
      this.detailsState = x.length > 0 ? 'in' : 'out');
  }

  onAnimationEvent(event: any) {
    if (event.fromState === 'out') {
      this.detailsvisible = true;
    }
    else if (event.fromState === 'in' && event.phaseName === 'done') {
      this.detailsvisible = false;
    }
  }
}
