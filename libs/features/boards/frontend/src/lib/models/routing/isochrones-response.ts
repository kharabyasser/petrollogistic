export interface IsochronesResponse {
    type: string
    metadata: Metadata
    bbox: number[]
    features: Feature[]
  }
  
  export interface Metadata {
    service: string
    timestamp: number
    query: Query
    engine: Engine
  }
  
  export interface Query {
    profile: string
    locations: number[][]
    range: number[]
  }
  
  export interface Engine {
    version: string
    build_date: string
    graph_date: string
  }
  
  export interface Feature {
    type: string
    properties: Properties
    geometry: Geometry
  }
  
  export interface Properties {
    group_index: number
    value: number
    center: number[]
  }
  
  export interface Geometry {
    coordinates: number[][][]
    type: string
  }
  