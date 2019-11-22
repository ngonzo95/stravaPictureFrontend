import { RunResponse } from '../response/run-response';

export class Run {
  id: string
  userId: string
  polyline: string

  constructor()
  constructor(runResoponse: RunResponse)
  constructor(runResoponse?: RunResponse) {
    if (runResoponse != null) {
      this.id = runResoponse.id
      this.userId = runResoponse.userId
      this.polyline = runResoponse.polyline
    }
  }
}
