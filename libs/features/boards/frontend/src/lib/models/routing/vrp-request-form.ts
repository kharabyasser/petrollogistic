import { DispatchStatus } from '../../domain/enums/dispatch-status';
import { Product } from '../../domain/product';
import { Coordinate } from '../maps/coordinate';
import { CapacityMode } from './enums/capacity-mode';
import { TrackMode } from './enums/track-mode';

export class VrpRequestForm {
  truckName: string = '';
  truckNumber: number = 0;
  ticketsCount: number = 0;
  isOptimize: boolean = true;
  truckConstraints?: TruckConstraint;
  productsConstraints?: ProductConstraint;
  ticketsConstraints?: TicketConstraint;
}

export class TruckConstraint {
  trackMode: TrackMode | null = null;
  startLocation?: Coordinate;
  endLocation?: Coordinate;
}

export class ProductConstraint {
  capacityMode: CapacityMode | null = null;
  productsData?: ProductConstraintData[];
}

export class TicketConstraint {
  selectionMode: TicketSelectionMode = TicketSelectionMode.All;
  ticketConstraintInputs: TicketConstraintInput[] = [];
}

export class ProductConstraintData {
  product?: Product;
  load: number = 0;
}

export class TicketConstraintInput {
  isOptimize: boolean = false;
  ticketNumber: number = 0;
  demand: number = 0;
  productName: string = '';
  status: DispatchStatus = DispatchStatus.onTruck;
}

export enum TicketSelectionMode {
  All = 1,
  None = 2,
  Custom = 3,
}
