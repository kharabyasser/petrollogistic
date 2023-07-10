

import { Component } from "@angular/core";
import { FieldType, FieldTypeConfig } from "@ngx-formly/core";

@Component({
    selector: 'petrologistic-product-constraint-form',
    templateUrl: './product-constraint-form.component.html',
    styleUrls: ['./product-constraint-form.component.scss'],
  })
export class ProductConstraintFormComponent extends FieldType<FieldTypeConfig> {
  productsData: any[] = [];
  capacityModes = ['Truck Load', 'Full', 'Empty', 'Custom'];

}