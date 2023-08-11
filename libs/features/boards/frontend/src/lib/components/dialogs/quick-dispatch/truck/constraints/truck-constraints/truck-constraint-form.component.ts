import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { getSelectListFromEnum } from "@petrologistic/core/frontend/helpers";
import { SelectListItem } from "@petrologistic/core/frontend/formly";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";
import { KnownLocation } from "libs/features/boards/frontend/src/lib/models/routing/vrp-request-form";

@Component({
    selector: 'petrologistic-truck-constraint-form',
    templateUrl: './truck-constraint-form.component.html',
    styleUrls: ['./truck-constraint-form.component.scss'],
  })
export class TruckConstraintFormComponent extends AbstactFormFieldConfigComponent {

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

  locations: SelectListItem[] = [
    {
      id: '1',
      code: 'TL',
      description: 'Truck Location',
      isActive: true
     }, 
     {
      id: '2',
      code: 'MDP',
      description: 'Main Depot',
      isActive: true
     }, 
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
        items: this.trackModes,
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
      defaultValue: KnownLocation.VehicleLocation,
      props: {
        label: 'Start location',
        items: getSelectListFromEnum(KnownLocation),
        optionsLabel: 'CODE',
        selectedItemLabel: 'CODE',
        required: true,
        showClear: false
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
        items: this.locations,
        optionsLabel: 'CODE_DESCRIPTION',
        selectedItemLabel: 'DESCRIPTION',
        required: true,
        showClear: true
      }
    };
  }
}