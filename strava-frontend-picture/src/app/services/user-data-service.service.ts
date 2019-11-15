import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Run } from '../model/run';
import { RunMap } from '../model/run-map';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  private _user: User
  private _runs: Set<string> //represents the runs that are being visualized
  private _currentMap: string //This represents the current map that is being displayed
  private _currentRunMap: RunMap //This represents the current runMap whoes data we are storing
  availableMaps: Subject<[string, string][]> = new Subject();
  // private _runMaps: RunMap

  constructor() {
    this._runs = new Set()
    this._currentMap = "baseMap"
    this._user = new User()
  }

  setUserData(user: User) {
    this._user = user
    this.availableMaps.next(this.getAvailableMaps())
  }
  getUserData(): User {
    return this._user
  }

  addRun(runId: string) {
    this._runs.add(runId)
  }

  addRuns(runIds: string[]) {
    for (let id of runIds) {
      this.addRun(id)
    }
  }

  //For testing only
  getRunList(): String[] {
    return [...this._runs.keys()]
  }

  clearRuns() {
    this._runs = new Set()
  }

  findRunsThatAreNotDisplayed(ids: string[]): string[] {
    let runsToLookAt: Set<string> = new Set(ids)
    for (let id in this._runs) {
      runsToLookAt.delete(id)
    }

    return [...runsToLookAt]
  }

  setRunMap(runMap: RunMap) {
    this._runs = new Set()
    this._currentRunMap = runMap
  }

  getRunMap(): RunMap {
    return this._currentRunMap
  }

  getAvailableMaps():[string, string][]{
    let maps: [string, string][] = [["baseMap", "Base Map"]]
    for (let marker of this._user.baseMap.markers){
      maps.push([marker.id, marker.text])
    }
    return maps
  }

}
