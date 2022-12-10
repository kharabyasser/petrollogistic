export interface MatrixResponse {
    durations: number[][],
    distances: number[][],
    sources: Destination[],
    matadata: any
}

interface Destination {
    location: number[][2],
    snapped_distance: number
}