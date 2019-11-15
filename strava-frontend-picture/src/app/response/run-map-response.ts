export interface RunMapResponse {
  id: string
  mapName: string
  userId: string
  center: [number, number]
  zoom: number
  runs: string[]
}
