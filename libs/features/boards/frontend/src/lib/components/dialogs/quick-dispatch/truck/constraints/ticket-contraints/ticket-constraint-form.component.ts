

import { Component } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";

@Component({
    selector: 'petrologistic-ticket-constraint-form',
    templateUrl: './ticket-constraint-form.component.html',
    styleUrls: ['./ticket-constraint-form.component.scss'],
  })
export class TicketConstraintFormComponent extends FieldType<FieldTypeConfig> {

}