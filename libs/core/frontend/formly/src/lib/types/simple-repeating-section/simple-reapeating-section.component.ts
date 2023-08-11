import { Component } from "@angular/core";
import { FieldArrayType } from "@ngx-formly/core";

@Component({
    selector: 'petrologistic-simple-repeating-section',
    template: `<div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
    <formly-field class="col" [field]="field"></formly-field>
</div>`,
  })
export class SimpleRepeatingSectionComponent extends FieldArrayType {
}