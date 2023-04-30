export interface VrpResult {
  code: number;
  summary: Summary;
  unassigned: any[];
  routes: Route[];
}

interface RouteStep {
  type: string;
  location: number[];
  service: number;
  waiting_time: number;
  arrival: number;
  duration: number;
  violations: any[];
  id?: number;
  job?: number;
}

interface Route {
  vehicle: number;
  cost: number;
  service: number;
  duration: number;
  waiting_time: number;
  priority: number;
  steps: RouteStep[];
  violations: any[];
}

interface ComputingTimes {
  loading: number;
  solving: number;
}

interface Summary {
  cost: number;
  unassigned: number;
  service: number;
  duration: number;
  waiting_time: number;
  priority: number;
  violations: any[];
  computing_times: ComputingTimes;
}
