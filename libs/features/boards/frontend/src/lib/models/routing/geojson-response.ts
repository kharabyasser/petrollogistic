export interface GeoJsonResponse {
  type: string
  metadata: Metadata
  bbox: number[]
  features: Feature[]
}

export interface Feature {
  bbox: number[]
  type: string
  properties: Properties
  geometry: Geometry
}

export interface Properties {
  segments: Segment[]
  extras: Extras
  warnings: Warning[]
  way_points: number[]
  summary: Summary2
  group_index: number
  value: number
  center: number[]
}

export interface Segment {
  distance: number
  duration: number
  steps: Step[]
}

export interface Step {
  distance: number
  duration: number
  type: number
  instruction: string
  name: string
  way_points: number[]
}

export interface Extras {
  roadaccessrestrictions: Roadaccessrestrictions
}

export interface Roadaccessrestrictions {
  values: number[][]
  summary: Summary[]
}

export interface Summary {
  value: number
  distance: number
  amount: number
}

export interface Warning {
  code: number
  message: string
}

export interface Summary2 {
  distance: number
  duration: number
}

export interface Geometry {
  coordinates: number[][]
  type: string
}

export interface Metadata {
  attribution: string
  service: string
  timestamp: number
  query: Query
  engine: Engine
}

export interface Query {
  coordinates: number[][]
  profile: string
  format: string
  range: number[]
  locations: number[][]
}

export interface Engine {
  version: string
  build_date: string
  graph_date: string
}
