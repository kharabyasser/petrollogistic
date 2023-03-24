import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Truck } from "../../domain/truck";
import { trucksSelector } from "./trucks-selectors";

import * as TruckActions from './trucks-actions';

@Injectable()
export class TrucksFacade {
    trucks$: Observable<Truck[]>;

    constructor(private store: Store) {
        this.trucks$ = this.store.pipe(select(trucksSelector));
    }

    loadTrucks() {
        this.store.dispatch(TruckActions.getTrucks());
    }
}