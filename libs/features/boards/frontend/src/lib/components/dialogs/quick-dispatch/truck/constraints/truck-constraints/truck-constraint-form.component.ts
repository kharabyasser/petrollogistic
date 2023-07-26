import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { SelectListItem } from "libs/core/frontend/formly/src/lib/interfaces/select-list-item";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";
import { of } from "rxjs";

@Component({
    selector: 'petrologistic-truck-constraint-form',
    templateUrl: './truck-constraint-form.component.html',
    styleUrls: ['./truck-constraint-form.component.scss'],
  })
export class TruckConstraintFormComponent extends AbstactFormFieldConfigComponent {

  depots = [
    
    { 
      id: 1,
      code: 'depot1', 
      description: 'Depot #1', 
      isActive: true
    },
    { 
      id: 2,
      code: 'depot2', 
      description: 'Depot #2', 
      isActive: true
    }, 
    { 
      id: 3,
      code: 'depot3',
      description: 'Depot #3', 
      isActive: true
    }, 
  ];

  trackModes: SelectListItem[] = [
    {
      id: '1',
      code: 'RT',
      description: 'Round Trip',
      isActive: true
     }, 
    { 
      id: '2',
      code: 'SAL',
      description: 'Same as Last', 
      isActive: true
    },
    { 
      id: '3',
      code: 'RTD', 
      description: 'Return to Depot', 
      isActive: true
    }
  ];

  protected getFieldGroupConfig(): FormlyFieldConfig[] {
    return [
      this.setStartLocation(),
      this.setTrackMode(),
      this.setReturnLocation()
    ];
  }

  private setTrackMode(): FormlyFieldConfig {
    return {
      key: 'trackMode',
      type: FormlyTypes.SINGLE_SELECT,
      className: 'track-mode',
      props: {
        label: 'Track mode',
        items$: of(this.trackModes),
        optionsLabel: 'CODE_DESCRIPTION',
        selectedItemLabel: 'DESCRIPTION',
        required: true,
        showClear: true
      },
    };
  }

  private setStartLocation(): FormlyFieldConfig {
    return {
      key: 'startLocation',
      type: FormlyTypes.SINGLE_SELECT,
      className: 'start-location',
      props: {
        label: 'Start location',
        options: of(this.depots),
        optionsLabel: 'CODE_DESCRIPTION',
        selectedItemLabel: 'DESCRIPTION',
        required: true,
        showClear: true
      }
    };
  }

  private setReturnLocation(): FormlyFieldConfig {
    return {
      key: 'startLocation',
      type: FormlyTypes.SINGLE_SELECT,
      className: 'end-location',
      props: {
        label: 'End location',
        options: of(this.depots),
        optionsLabel: 'CODE_DESCRIPTION',
        selectedItemLabel: 'DESCRIPTION',
        required: true,
        showClear: true
      }
    };
  }
}