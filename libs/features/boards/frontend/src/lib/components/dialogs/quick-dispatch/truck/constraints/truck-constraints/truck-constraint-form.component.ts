import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { AbstactFormFieldConfigComponent } from "libs/features/boards/frontend/src/lib/shared/form-field-config.component";

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

  trackModes = [
    { label: 'Round Trip', value: 'roundTrip' }, 
    { label: 'Same as Last', value: 'sameAsLast'},
    { label: 'Return to Depot', value: 'retrunToDepot' }
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
      type: 'select',
      className: 'track-mode',
      templateOptions: {
        label: 'Track mode',
        options: this.trackModes,
      }
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