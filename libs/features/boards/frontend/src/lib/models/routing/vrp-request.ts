import { Coordinate } from "../maps/coordinate";
import { TrackMode } from "./enums/track-mode";

export interface VrpRequestDto {
  jobs: Job[];
  reloads?: Reload[];
  vehicles: Vehicle[];
  depot?: Coordinate;
}

export interface Job {
  id: number;
  location: Coordinate;
  demands: number[];
  requiredSkills?: number[];
}

export interface Reload {
  id: number;
  location: Coordinate;
}

export interface Vehicle {
  id: number;
  capacity?: number[];
  initialLoad?: number[];
  start?: Coordinate;
  end?: Coordinate;
  trackMode: TrackMode;
  skills?: number[];
  maxDrivingDistance?: number;
  maxDrivingTime?: number;
  averageDrivingSpeed?: number;
}