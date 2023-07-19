

import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";

@Component({
    selector: 'petrologistic-product-constraint-form',
    templateUrl: './product-constraint-form.component.html',
    styleUrls: ['./product-constraint-form.component.scss'],
  })
export class ProductConstraintFormComponent extends AbstactFormFieldConfigComponent {
  capacityModes = [
    { label: 'Truck Load', value: 'truckLoad' },
    { label: 'Full', value: 'full' },
    { label: 'Empty',  value: 'empty' },
    { label: 'Custom', value: 'custom' }
  ];

  protected override getFieldGroupConfig(): FormlyFieldConfig[] {
    return [
      this.setCapacityMode(),
      this.setProductsLoads()
    ]
  }

  setCapacityMode(): FormlyFieldConfig {
    return {
      key: 'capacityMode',
      type: 'select',
      templateOptions: {
        label: 'Capacity Mode',
        options: this.capacityModes
      }
    }
  }

  setProductsLoads(): FormlyFieldConfig {
    return {
      key: 'productsData',
      type: FormlyTypes.SIMPLE_REPEATING_SECTION,
      fieldArray: {
        fieldGroup: [
          {
            key: 'load',
            className: 'col-sm-4',
            type: 'input',
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                if (field.props) {
                  field.props['label'] = field.model.product.name;
                }
              }
            }
          },
        ]
      }
    }
  }
}