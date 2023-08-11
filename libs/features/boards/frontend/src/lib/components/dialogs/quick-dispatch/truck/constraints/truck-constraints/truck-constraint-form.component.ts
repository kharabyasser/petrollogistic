/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormlyTypes } from "@petrologistic/core/frontend/formly";
import { getSelectListFromEnum } from "@petrologistic/core/frontend/helpers";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";
import { KnownLocation } from "libs/features/boards/frontend/src/lib/models/routing/vrp-request-form";
import { TrackMode } from "libs/features/boards/frontend/src/lib/models/routing/enums/track-mode";

@Component({
    selector: 'petrologistic-truck-constraint-form',
    templateUrl: './truck-constraint-form.component.html',
    styleUrls: ['./truck-constraint-form.component.scss'],
  })
export class TruckConstraintFormComponent extends AbstactFormFieldConfigComponent {

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
      defaultValue: TrackMode.ROUND_TRIP,
      props: {
        label: 'Track mode',
        items: getSelectListFromEnum(TrackMode),
        optionsLabel: 'CODE',
        selectedItemLabel: 'CODE',
        required: true,
        showClear: false
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
        items: getSelectListFromEnum(KnownLocation),
        optionsLabel: 'CODE',
        selectedItemLabel: 'CODE',
        required: true,
        showClear: false
      }
    };
  }
}