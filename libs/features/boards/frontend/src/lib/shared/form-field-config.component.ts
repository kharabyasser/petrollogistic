import { Component, HostBinding } from '@angular/core';
import { FieldType, FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export abstract class AbstactFormFieldConfigComponent extends FieldType implements FormlyExtension {

  @HostBinding('class') hostClassNames: string = '';

  protected fieldDestroy$ = new Subject<void>();

  protected readonly fieldClassName: string = '';
  protected fieldConfig: FormlyFieldConfig | null = null;

  constructor() {
    super();
    this.onPopulate = this.onPopulate.bind(this);
    this.onFieldInit = this.onFieldInit?.bind(this);
    this.onFieldDestroy = this.onFieldDestroy.bind(this);
  }

  onPopulate(field: FormlyFieldConfig): void {
    // skip if already initialized
    if (field.fieldGroup) return;

    this.fieldConfig = field;

    this.fieldConfig.className = this.fieldClassName;
    this.fieldConfig.fieldGroup = this.getFieldGroupConfig();
    this.fieldConfig.hooks = {
      onInit: field => this.onFieldInit?.(field),
      onDestroy: () => this.onFieldDestroy()
    }
  }

  protected abstract getFieldGroupConfig(): FormlyFieldConfig[];

  protected onFieldInit?(field: FormlyFieldConfig): void;

  protected onFieldDestroy(): void {
    this.fieldDestroy$.next();
  };
}
