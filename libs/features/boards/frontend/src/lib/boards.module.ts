import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardsComponent } from './components/boards/boards.component';
import { TableLayoutComponent } from './components/layouts/table-layout/table-layout.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';

import { StoreModule } from '@ngrx/store';
import { reducers } from './+state/delivery-requests-reducer';

import { DeliveryRequestService } from './services/deliveryrequest-service';
import { CoreFrontendApolloModule } from '@petrologistic/core/frontend/apollo';
import { EffectsModule } from '@ngrx/effects';
import { DeliveryRequestsEffect } from './+state/delivery-requests-effects';
import { DeliveryRequestsFacade } from './+state/delivery-requests-facade';

@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    MultiSelectModule,
    FormsModule,
    TagModule,
    DropdownModule,
    KnobModule,
    CoreFrontendApolloModule,
    StoreModule.forFeature('DeliveryRequests', reducers),
    EffectsModule.forFeature([DeliveryRequestsEffect])
  ],
  declarations: [
    BoardsComponent,
    TableLayoutComponent,
  ],
  exports: [TableLayoutComponent],
  providers: [DeliveryRequestService, DeliveryRequestsFacade]
})
export class BoardsModule { }
