

import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";
import { of } from "rxjs";

@Component({
    selector: 'petrologistic-product-constraint-form',
    templateUrl: './product-constraint-form.component.html',
    styleUrls: ['./product-constraint-form.component.scss'],
  })
export class ProductConstraintFormComponent extends AbstactFormFieldConfigComponent {
  capacityModes = [
    { 
      id: 1,
      description: 'Truck Load', 
      code: 'truckLoad',
      isActive: true
    },
    { 
      id: 2,
      description: 'Full', 
      code: 'full',
      isActive: true
    },
    { 
      id: 3,
      description: 'Empty', 
      code: 'empty',
      isActive: true
    },
    { 
      id: 4,
      description: 'Custom', 
      code: 'custom',
      isActive: true
    }
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
      type: FormlyTypes.SINGLE_SELECT,
      className: 'capacity-mode',
      templateOptions: {
        label: 'Capacity Mode',
        items$: of(this.capacityModes),
        optionsLabel: 'CODE_DESCRIPTION',
        selectedItemLabel: 'DESCRIPTION',
        required: true,
        showClear: true
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
            type: FormlyTypes.NUMBER_INPUT,
            className: 'products',
            hooks: {
              onInit: (field: FormlyFieldConfig) => {
                if (field.props) {
                  field.props['label'] = field.model.product.name;
                  field.props['suffix'] = `/${field.model.capacity}`;
                }
              }
            }
          },
        ]
      }
    }
  }
}