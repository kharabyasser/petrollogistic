import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TrucksService } from '../../services/trucks-service';

import * as TrucksActions from './trucks-actions';

@Injectable()
export class TrucksEffect {
    getTrucks$ = createEffect(() =>
        this.actions$.pipe(ofType(TrucksActions.getTrucks),
            mergeMap(() => {
                return this.trucksService
                    .getTrucks()
                    .pipe(
                        map(trucks => TrucksActions.getTrucksSuccess({ data: trucks })),
                        catchError(error => of(TrucksActions.onError({ error: error.message }))));
            }))
    );

  constructor(
    private actions$: Actions,
    private trucksService: TrucksService
  ) {}
}
