import { SelectListItem } from 'libs/core/frontend/formly/src/lib/interfaces/select-list-item';
import { Observable, filter, map, withLatestFrom } from 'rxjs';

export function getSelectListFromEnum<T extends { [key: string]: string | number }>(selectableEnum: T): SelectListItem[] {
  return Object.keys(selectableEnum)
    .filter(key => isNaN(Number(key)))
    .sort()
    .map((key: string) => {
      return {
        id: selectableEnum[key],
        code: key,
        description: selectableEnum[key].toString()
      };
    });
}

export function getLoadedSelectItems(items$: Observable<SelectListItem[]>, loaded$: Observable<boolean>): Observable<SelectListItem[]> {
  return items$
    .pipe(
      withLatestFrom(loaded$),
      filter(([, loaded]) => !!loaded),
      map(([items]) => items)
    );
}

export function filterSelectListByAttribute(
  selectList$: Observable<SelectListItem[]>,
  attrKey: string,
  filterVal: string|number
): Observable<SelectListItem[]> {
  return selectList$.pipe(
    map((items: SelectListItem[]) =>
      items.filter((selectItem: SelectListItem) => {
        const attr = selectItem?.attributes;
        return attr ? attr[attrKey] === filterVal : selectItem.code;
      })
    )
  );
}
