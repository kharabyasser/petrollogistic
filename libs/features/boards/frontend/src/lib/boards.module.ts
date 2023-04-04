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
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { StoreModule } from '@ngrx/store';

import { DeliveryRequestService } from './services/deliveryrequest-service';
import { CoreFrontendApolloModule } from '@petrologistic/core/frontend/apollo';
import { CoreFrontendPPanelChildModule } from '@petrologistic/core/frontend/p-panel-child'
import { EffectsModule } from '@ngrx/effects';
import { BoardsContainerComponent } from './containers/boards-container.component';
import { DetailsComponent } from './components/details/delivery/delivery-detail.component';
import { MapsComponent } from './components/maps/maps.component';
import { RoutingService } from './services/routing-service';
import { TruckComponent } from './components/details/truck/truck.component';
import { deliveryRequestsReducer } from './+state/delivery-requests/delivery-requests-reducer';
import { DeliveryRequestsFacade } from './+state/delivery-requests/delivery-requests-facade';
import { TrucksService } from './services/trucks-service';
import { TrucksFacade } from './+state/trucks/trucks-facade';
import { DeliveryRequestsEffect } from './+state/delivery-requests/delivery-requests-effects';
import { TrucksEffect } from './+state/trucks/trucks-effects';
import { trucksReducer } from './+state/trucks/trucks-reducer';
import { MapsFacade } from './+state/maps/maps-facade';
import { mapsReducer } from './+state/maps/maps-reducer';
import { MapService } from './services/maps-service';

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
    ProgressBarModule,
    ChartModule,
    AccordionModule,
    CoreFrontendApolloModule,
    CoreFrontendPPanelChildModule,
    FieldsetModule,
    SelectButtonModule,
    PanelModule,
    InputTextareaModule,
    CardModule,
    AvatarModule,
    InputSwitchModule,
    ToggleButtonModule,
    StoreModule.forFeature('DeliveryRequests', deliveryRequestsReducer),
    EffectsModule.forFeature([DeliveryRequestsEffect]),
    StoreModule.forFeature('Trucks', trucksReducer),
    EffectsModule.forFeature([TrucksEffect]),
    StoreModule.forFeature('Maps', mapsReducer),
  ],
  declarations: [
    TableComponent,
    BoardsContainerComponent,
    DetailsComponent,
    TruckComponent,
    MapsComponent
  ],
  exports: [BoardsContainerComponent],
  providers: [
    DeliveryRequestService, 
    TrucksService, 
    DeliveryRequestsFacade, 
    TrucksFacade,
    MapsFacade, 
    MapService,
    RoutingService],
})
export class BoardsModule {}
