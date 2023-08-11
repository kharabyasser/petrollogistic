/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { getSelectListFromEnum } from "@petrologistic/core/frontend/helpers";
import { CapacityMode } from "libs/features/boards/frontend/src/lib/models/routing/enums/capacity-mode";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";
import { of } from "rxjs";

@Component({
    selector: 'petrologistic-product-constraint-form',
    templateUrl: './product-constraint-form.component.html',
    styleUrls: ['./product-constraint-form.component.scss'],
  })
export class ProductConstraintFormComponent extends AbstactFormFieldConfigComponent {
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
      defaultValue: CapacityMode.TRUCK_LOAD,
      templateOptions: {
        label: 'Capacity Mode',
        items: getSelectListFromEnum(CapacityMode),
        optionsLabel: 'CODE',
        selectedItemLabel: 'CODE',
        required: true,
        showClear: false
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