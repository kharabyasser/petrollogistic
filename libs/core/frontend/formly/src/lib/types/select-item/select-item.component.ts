import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SelectListItem, SelectListItemViewMode } from '../../interfaces/select-list-item';
import { SelectOptionById } from '../../helpers/select-options-by-id.helper';

@Component({
  selector: 'select-item',
  templateUrl: './select-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectItemComponent implements OnInit {

  ngOnInit(): void {
  }

  @Input() viewMode: SelectListItemViewMode = SelectListItemViewMode.CODE;
  @Input() item?: SelectListItem;
  @Input() disabled = false;

  @Input() set options(options: SelectListItem[]) {
    if (!this.item?.code && options?.length) {
      const selectItem = SelectOptionById(<string>this.item?.id, options);
      this.item = selectItem || this.item;
    }
  }

  readonly SelectViewMode = SelectListItemViewMode;
}
