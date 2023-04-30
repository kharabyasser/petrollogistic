export interface VrpRequest {
  vehicles: Vehicle[];
  jobs: Job[];
}

export interface Vehicle {
  id: number;
  profile: string;
  start: number[];
  end: number[];
}

export interface Job {
  id: number;
  location: number[];
}
