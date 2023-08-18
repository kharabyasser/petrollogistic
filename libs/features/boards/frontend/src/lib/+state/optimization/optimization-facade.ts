import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  optimizationJobsSelector,
  optimizationProductsSelector
} from './optimization-selectors';

import * as OptimizationActions from './optimization-actions';
import { Job } from '../../models/routing/vrp-request';
import { Product } from '../../domain/product';

@Injectable()
export class OptimizationFacade {
  optimizationJobs$: Observable<Job[]>;
  optimizationProducts$: Observable<Product[]>;

  constructor(private store: Store) {
    this.optimizationJobs$ = this.store.pipe(select(optimizationJobsSelector));

    this.optimizationProducts$ = this.store.pipe(select(optimizationProductsSelector));
  }

  addOptimizationJob(job: Job) {
    this.store.dispatch(OptimizationActions.addOptimizationJob({ data: job }));
  }

  removeOptimizationJob(jobId: number) {
    this.store.dispatch(OptimizationActions.removeOptimizationJob({ data: jobId }));
  }

  setOptimizationProducts(products: Product[]) {
    this.store.dispatch(OptimizationActions.setOptimizationProducts({ data: products }));
  }
}
