import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardsComponent } from './components/boards/boards.component';
import { TableLayoutComponent } from './components/layouts/table-layout/table-layout.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DeliveryRequestService } from './services/deliveryrequest-service';
import { CoreFrontendApolloModule } from 'libs/core/frontend/apollo/src';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';


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
    CoreFrontendApolloModule
  ],
  declarations: [
    BoardsComponent,
    TableLayoutComponent,
  ],
  exports: [TableLayoutComponent],
  providers: [DeliveryRequestService]
})
export class BoardsModule { }
