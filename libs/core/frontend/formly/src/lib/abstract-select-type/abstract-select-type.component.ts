import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { filter, map, Observable, of, Subject, takeUntil, tap } from 'rxjs';
import {
  SelectListItem,
  SelectListItemViewMode,
  SelectListUpdateEventType,
} from '../interfaces/select-list-item';
import { ListInputHelper } from '../helpers/list-input.helper';

@UntilDestroy()
@Directive()
export abstract class AbstractSelectType
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  allItems: SelectListItem[] = [];
  activeItems$: Observable<SelectListItem[]> = of([]);

  private fieldConfigUpdate$ = new Subject<void>();
  items$: Observable<SelectListItem[]> = of([]);

  constructor(private cdr: ChangeDetectorRef) {
    super();
    this.customSearchFn = this.customSearchFn.bind(this);
  }

  ngOnInit(): void {
    this.setFilteredItems();
    this.handleFieldConfigChange();
  }

  customSearchFn(term: string, item: SelectListItem): boolean {
    const searchTerm = term.toLowerCase();

    switch (this.props['optionsLabel']) {
      case SelectListItemViewMode.CODE:
        return this.isSearchCodeMatch(searchTerm, item);
      case SelectListItemViewMode.CODE_DESCRIPTION:
        return (
          this.isSearchCodeMatch(searchTerm, item) ||
          this.isSearchDescriptionMatch(searchTerm, item)
        );
      case SelectListItemViewMode.DESCRIPTION:
        return this.isSearchDescriptionMatch(searchTerm, item);
      default:
        return false;
    }
  }

  private setFilteredItems(): void {
    const excludeItems$: Observable<string[]> =
      this.props['excludeItems$'] || of([]);
    const filteredItems$ = ListInputHelper.getSelectListItemsAsync(
      this.formControl,
      excludeItems$,
      this.props['items'],
      this.props['items$'],
      this.props['optionsLoaded'],
    );

    this.items$ = filteredItems$.pipe(takeUntil(this.fieldConfigUpdate$));

    this.setActiveItems();
  }

  private handleFieldConfigChange(): void {
    this.options.fieldChanges
      ?.pipe(
        filter((event) => {
          const isListUpdate =
            event.type === SelectListUpdateEventType.OPTIONS_LIST_UPDATE;
          const isSelf = this.field.key === event.field.key;
          return isSelf && isListUpdate;
        }),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.fieldConfigUpdate$.next();
        this.setFilteredItems();
        this.cdr.markForCheck();
      });
  }

  private setActiveItems(): void {
    this.activeItems$ = this.items$.pipe(
      tap((allItems) => (this.allItems = allItems)),
      // false is added intentionally, to avoid filtering of items without isActive flag
      map((items) => items.filter((item) => item?.isActive !== false)),
    );
  }

  private isSearchCodeMatch(searchTerm: string, item: SelectListItem): boolean {
    const itemCode = item.code || '';
    return itemCode.toLowerCase().includes(searchTerm);
  }

  private isSearchDescriptionMatch(
    searchTerm: string,
    item: SelectListItem,
  ): boolean {
    const itemDesc = item.description || '';
    return itemDesc.toLowerCase().includes(searchTerm);
  }
}
