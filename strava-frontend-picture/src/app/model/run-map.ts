import { RunMapResponse } from '../response/run-map-response';

export class RunMap {
  id: string
  mapName: string
  userId: string
  center: [number, number]
  zoom: number
  runs: string[]

  constructor()
  constructor(runMapResponse: RunMapResponse)
  constructor(runMapResponse?: RunMapResponse){
    if(runMapResponse != null){
      this.id = runMapResponse.id
      this.mapName = runMapResponse.mapName
      this.userId = runMapResponse.userId
      this.center = runMapResponse.center
      this.zoom = runMapResponse.zoom
      this.runs = runMapResponse.runs
    }
  }
}
