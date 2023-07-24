import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { SimpleRepeatingSectionComponent } from './types/simple-repeating-section/simple-reapeating-section.component';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyTypes } from './types/formly-types';
import { SingleSelectTypeComponent } from './types/single-select/single-select-type.component';
import { SelectItemComponent } from './types/select-item/select-item.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({
      types: [
        { 
          name: FormlyTypes.SIMPLE_REPEATING_SECTION, 
          component: SimpleRepeatingSectionComponent 
        },
        {
          name: FormlyTypes.SINGLE_SELECT,
          component: SingleSelectTypeComponent
        }
      ],
    }),
  ],
  declarations: [
    SimpleRepeatingSectionComponent,
    SingleSelectTypeComponent,
    SelectItemComponent
  ]
})
export class CoreFrontendFormlyModule {}
