import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { SimpleRepeatingSectionComponent } from './simple-repeating-section/simple-reapeating-section.component';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyTypes } from './types/formly-types';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({
      types: [
        { 
          name: FormlyTypes.SIMPLE_REPEATING_SECTION, 
          component: SimpleRepeatingSectionComponent 
        },
      ],
    }),
  ],
  declarations: [
    SimpleRepeatingSectionComponent
  ]
})
export class CoreFrontendFormlyModule {}
