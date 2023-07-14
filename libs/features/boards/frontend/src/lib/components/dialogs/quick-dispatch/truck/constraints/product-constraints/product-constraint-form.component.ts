

import { Component } from "@angular/core";
import { FormlyFieldConfig, FormlyFieldProps } from "@ngx-formly/core";
import { AbstactEventFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";

@Component({
    selector: 'petrologistic-product-constraint-form',
    templateUrl: './product-constraint-form.component.html',
    styleUrls: ['./product-constraint-form.component.scss'],
  })
export class ProductConstraintFormComponent extends AbstactEventFormFieldConfigComponent {
  productsData: any[] = [
    {
      productName: 'Clear Diesel',
      load: 1200
    },
    {
      productName: 'Dyed Diesel',
      load: 500
    }
  ];
  capacityModes = [
    { label: 'Truck Load', value: 'truckLoad' },
    { label: 'Full', value: 'full' },
    { label: 'Empty',  value: 'empty' },
    { label: 'Custom', value: 'custom' }
  ];

  protected override getFieldGroupConfig(): FormlyFieldConfig<FormlyFieldProps & { [additionalProperties: string]: any; }>[] {
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
      type: 'number',
      defaultValue: this.productsData[0].load,
      props: {
        label: this.productsData[0].productName,
      },
      expressions: {
        'props.disabled': "this.model.capacityMode !== 'custom'"
      }
    }
  }
}