import { Component } from '@angular/core';
import { TrucksFacade } from '../../../../+state/trucks/trucks-facade';
import { Truck } from '../../../../domain/truck';
import { MapsFacade } from '../../../../+state/maps/maps-facade';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Observable } from 'rxjs';
import { TruckConstraintFormComponent } from './constraints/truck-constraints/truck-constraint-form.component';
import { ProductConstraintFormComponent } from './constraints/product-constraints/product-constraint-form.component';
import { TrackMode } from '../../../../models/routing/enums/track-mode';
import { TicketConstraintFormComponent } from './constraints/ticket-contraints/ticket-constraint-form.component';
import { AbstactFormFieldConfigComponent } from '../../../../shared/form-field-config.component';

@Component({
  selector: 'petrologistic-quick-dispatch-truck',
  templateUrl: './quick-dispatch.truck.html',
  styleUrls: ['./quick-dispatch.truck.scss'],
})
export class QuickDispatchTruckComponent extends AbstactFormFieldConfigComponent {
  trucks$: Observable<Truck[]>;

  miniTicketsView = true;
  chartsCollapsed = false;
  hideCharts = false;

  constructor(
    private trucksFacade: TrucksFacade,
    private mapsFacade: MapsFacade
  ) {
    super();
    this.trucks$ = this.trucksFacade.trucks$;
  }

  protected override getFieldGroupConfig(): FormlyFieldConfig[] {
    return [
      this.setTruckConstraints(),
      this.setProductsConstraints(),
      this.setTicketsConstraints()
    ]
  }

  setTruckConstraints(): FormlyFieldConfig {
    return {
      key: 'truckConstraints',
      type: TruckConstraintFormComponent
    };
  }

  setProductsConstraints(): FormlyFieldConfig {
    return {
      key: 'productsConstraints',
      type: ProductConstraintFormComponent
    };
  }

  setTicketsConstraints(): FormlyFieldConfig {
    return {
      key: 'ticketsConstraints',
      type: TicketConstraintFormComponent
    };
  }
}
