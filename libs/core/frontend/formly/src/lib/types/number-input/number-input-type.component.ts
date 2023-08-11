import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'number-input',
  templateUrl: './number-input-type.component.html',
  styleUrls: ['./number-input-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputTypeComponent extends FieldType<FieldTypeConfig> {
  readonly maxInputLength = 16;

  override defaultOptions = {
    props: {
      label: '',
      placeholder: '',
      required: false,
      disabled: false,
      useGrouping: false,
      maxFractionDigits: 4,
      minFractionDigits: 0,
      showButtons: false,
      min: -Number.MAX_SAFE_INTEGER,
      max: +Number.MAX_SAFE_INTEGER,
      allowInvalidInput: true,
    },
  };
}
