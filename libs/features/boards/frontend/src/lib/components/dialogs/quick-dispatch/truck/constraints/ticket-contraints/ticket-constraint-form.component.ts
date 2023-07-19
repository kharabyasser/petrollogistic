
import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";
import { TicketInputFormComponent } from "./ticket-input-form/ticket-input-form.component";

@Component({
    selector: 'petrologistic-ticket-constraint-form',
    templateUrl: './ticket-constraint-form.component.html',
    styleUrls: ['./ticket-constraint-form.component.scss'],
  })
export class TicketConstraintFormComponent extends AbstactFormFieldConfigComponent {

  protected override getFieldGroupConfig(): FormlyFieldConfig[] {
    return [
      this.setTicketsConstraintsSection()
    ]
  }


  setTicketsConstraintsSection(): FormlyFieldConfig {
    return {
      key: 'ticketConstraintInputs',
      type: FormlyTypes.SIMPLE_REPEATING_SECTION,
      fieldArray: {
        fieldGroup: [
          {
            key: '',
            type: TicketInputFormComponent,
          }
        ]
      }
    }
  }
}