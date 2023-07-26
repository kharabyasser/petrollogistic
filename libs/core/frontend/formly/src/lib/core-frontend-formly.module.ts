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
import { FormlyWrappersEnum } from './wrappers/formly-wrapper';
import { DefaultFormFieldWrapperComponent } from './wrappers/default-wrapper/default-form-field-wrapper.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    NgSelectModule,
    FormsModule,
    FormlyModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    FormlyModule.forRoot({
      wrappers: [
        {
          name: FormlyWrappersEnum.DEFAULT_WRAPPER,
          component: DefaultFormFieldWrapperComponent
        },
      ],
      types: [
        { 
          name: FormlyTypes.SIMPLE_REPEATING_SECTION, 
          component: SimpleRepeatingSectionComponent 
        },
        {
          name: FormlyTypes.SINGLE_SELECT,
          component: SingleSelectTypeComponent,
          wrappers: [FormlyWrappersEnum.DEFAULT_WRAPPER]
        }
      ],
    }),
  ],
  declarations: [
    SimpleRepeatingSectionComponent,
    SingleSelectTypeComponent,
    SelectItemComponent,
    DefaultFormFieldWrapperComponent
  ]
})
export class CoreFrontendFormlyModule {}
