import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { TableComponent } from './components/table/table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { KnobModule } from 'primeng/knob';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { AccordionModule } from 'primeng/accordion';
import { FieldsetModule } from 'primeng/fieldset';

import { StoreModule } from '@ngrx/store';
import { reducers } from './+state/delivery-requests-reducer';

import { DeliveryRequestService } from './services/deliveryrequest-service';
import { CoreFrontendApolloModule } from '@petrologistic/core/frontend/apollo';
import { EffectsModule } from '@ngrx/effects';
import { DeliveryRequestsEffect } from './+state/delivery-requests-effects';
import { DeliveryRequestsFacade } from './+state/delivery-requests-facade';
import { BoardsContainerComponent } from './containers/boards-container.component';
import { DetailsComponent } from './components/details/details.component';
import { MapsComponent } from './components/maps/maps.component';
import { RoutingService } from './services/routing-service';

@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    BrowserModule,
    HttpClientModule,
    MultiSelectModule,
    FormsModule,
    TagModule,
    DividerModule,
    DropdownModule,
    KnobModule,
    ChartModule,
    AccordionModule,
    CoreFrontendApolloModule,
    FieldsetModule,
    StoreModule.forFeature('DeliveryRequests', reducers),
    EffectsModule.forFeature([DeliveryRequestsEffect]),
  ],
  declarations: [TableComponent, BoardsContainerComponent, DetailsComponent, MapsComponent],
  exports: [BoardsContainerComponent],
  providers: [DeliveryRequestService, DeliveryRequestsFacade, RoutingService],
})
export class BoardsModule {}
