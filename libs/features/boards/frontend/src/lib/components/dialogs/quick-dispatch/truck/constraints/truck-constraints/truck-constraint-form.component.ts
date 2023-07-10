import { Component } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";

@Component({
    selector: 'petrologistic-truck-constraint-form',
    templateUrl: './truck-constraint-form.component.html',
    styleUrls: ['./truck-constraint-form.component.scss'],
  })
export class TruckConstraintFormComponent extends FieldType<FieldTypeConfig> {

  atoModes = ['Optimize', 'Forced', 'Custom'];
  depots = ['Depot #1', 'Depot #2', 'Depot #3'];
  returnSites = ['Round Trip', 'Same as Last', 'Return to Depot'];

}