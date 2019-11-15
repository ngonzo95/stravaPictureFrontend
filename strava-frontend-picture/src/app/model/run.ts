import { RunResponse } from '../response/run-response';

export class Run {
  id: string
  userId: string
  gpx: [number, number][]

  constructor()
  constructor(runResoponse: RunResponse)
  constructor(runResoponse?: RunResponse) {
    if (runResoponse != null) {
      this.id = runResoponse.id
      this.userId = runResoponse.userId
      this.gpx = runResoponse.gpx
    }
  }
}
