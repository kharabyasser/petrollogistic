import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractSelectType } from '../../abstract-select-type/abstract-select-type.component';
import { SelectListItem } from '../../interfaces/select-list-item';

@Component({
  selector: 'single-select',
  templateUrl: './single-select-type.component.html',
  styleUrls: ['./single-select-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SingleSelectTypeComponent extends AbstractSelectType {
  override defaultOptions = {
    props: {
      placeholder: 'Select an option',
      options: [],
      showClear: true,
      optionsLabel: 'DESCRIPTION',
      selectedItemLabel: 'DESCRIPTION',
      items: null,
      items$: null,
      excludeItems$: null,
      virtualScroll: true,
      bindValue: 'id',
      showInactiveItems: false,
    },
  };
}
