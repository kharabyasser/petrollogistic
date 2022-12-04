import { Component } from '@angular/core';
import { RoutingService } from '../../services/routing-service';

@Component({
  selector: 'petrologistic-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  constructor(private routingService: RoutingService) {
  }
}
