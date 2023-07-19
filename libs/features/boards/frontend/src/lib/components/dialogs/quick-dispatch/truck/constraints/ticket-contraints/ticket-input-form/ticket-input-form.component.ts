import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";

@Component({
    selector: 'petrologistic-ticket-form',
    templateUrl: './ticket-input-form.component.html',
    styleUrls: ['./ticket-input-form.component.scss'],
  })
export class TicketInputFormComponent extends AbstactFormFieldConfigComponent {

  protected override getFieldGroupConfig(): FormlyFieldConfig[] {
    return [
      this.setTicketsInput()
    ]
  }

  setTicketsInput(): FormlyFieldConfig {
    return {
      key: '',
    }
  }
}
