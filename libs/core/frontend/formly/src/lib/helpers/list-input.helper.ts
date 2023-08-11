import { FormControl } from '@angular/forms';
import { combineLatest, filter, map, Observable, of, tap } from 'rxjs';
import { SelectListItem } from '../interfaces/select-list-item';

export class ListInputHelper {
  public static getSelectListItemsAsync(
    formControl: FormControl,
    excludeItems$: Observable<string[]>,
    staticItems?: SelectListItem[],
    items$?: Observable<SelectListItem[]>,
    loadedCallback?: (options: SelectListItem[]) => void

  ): Observable<SelectListItem[]> {
    const list$ = staticItems ? of(staticItems) : items$ ?? of([]);

    return combineLatest([list$, excludeItems$]).pipe(
      filter(([options]) => !!options.length),
      tap(([options]) => loadedCallback && loadedCallback(options)),
      filter(([options]) => !!options.length),
      map(([allItems, filtered]) => this.filterAvailableItems(allItems, filtered, formControl)),
      tap(applicableOptions => this.validateSelection(applicableOptions, formControl))
    );
  }

  private static filterAvailableItems(
    allItems: SelectListItem[],
    filteredItemIds: string[],
    formControl: FormControl
  ): SelectListItem[] {

    if (filteredItemIds?.length === 0) return allItems;

    return allItems.filter((item) => {
      const currentValues = this.getCurrentValues(formControl);
      const isDuplicate = filteredItemIds?.find((y: string) => y === item.id);
      const isSelf = currentValues.includes(item.id);
      return isSelf || !isDuplicate;
    });
  }

  private static getCurrentValues(formControl: FormControl): (string|number)[] {
    const val = formControl?.value;
    const valArr = val ? [ val ] : [];
    return Array.isArray(val) ? val : valArr;
  }

  private static validateSelection(options: SelectListItem[], formControl: FormControl): void {
    // const currentValue = formControl.value;
    const currentValues = this.getCurrentValues(formControl);
    const validValues = currentValues.filter(id => !!options.find(option => option.id === id))
    if (currentValues.length && currentValues.length !== validValues.length) {
      const formVal = validValues.length ? validValues : null;
      formControl.setValue(formVal);
    }
  }
}