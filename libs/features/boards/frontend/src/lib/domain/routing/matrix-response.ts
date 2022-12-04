export interface MatrixResponse {
    distances: number[][4],
    destinations: Destination[],
    sources: Destination[],
    matadata: any
}

interface Destination {
    location: number[][2],
    snapped_distance: number
}