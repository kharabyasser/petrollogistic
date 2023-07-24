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
    { label: 'Depot #1', value: 'depot1' },
    { label: 'Depot #2', value: 'depot2' }, 
    { label: 'Depot #3', value: 'depot3' }, 
  ];

  trackModes: SelectListItem[] = [
    {
      id: '1',
      code: 'roundTrip',
      description: 'Round Trip',
      isActive: true
     }, 
    { 
      id: '2',
      code: 'sameAsLast',
      description: 'Same as Last', 
      isActive: true
    },
    { 
      id: '3',
      code: 'retrunToDepot', 
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
        selectedItemLabel: 'CODE',
        required: true,
        showClear: true
      },
    };
  }

  private setStartLocation(): FormlyFieldConfig {
    return {
      key: 'startLocation',
      type: 'select',
      className: 'start-location',
      props: {
        label: 'Start location',
        options: this.depots,
      }
    };
  }

  private setReturnLocation(): FormlyFieldConfig {
    return {
      key: 'endLocation',
      type: 'select',
      className: 'end-location',
      props: {
        label: 'End location',
        options: this.depots,
      }
    };
  }
}