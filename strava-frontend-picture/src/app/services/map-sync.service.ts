import { Injectable } from '@angular/core';
import { MapEditorService } from './map-editor.service';
import { Marker } from '../model/marker'
import { UserDataServiceService } from './user-data-service.service';
import { BaseMap } from '../model/user';
import { BackendApiServiceService } from './backend-api-service.service';
import { RunMap } from '../model/run-map';
import { Run } from '../model/run';

@Injectable({
  providedIn: 'root'
})
export class MapSyncService {

  private _currentMapId: string;

  constructor(private mapEditor: MapEditorService, private userDataService: UserDataServiceService, private api:BackendApiServiceService) {
    this._currentMapId = "baseMap";

  }

  initMap() {
    this.mapEditor.createNewMap()
  }
  /**
   * This generates the baseMap based on the user's information and updates
   * it accordingly
  **/
  generateBaseMap() {
    let baseMap: BaseMap = this.userDataService.getUserData().baseMap;
    this.mapEditor.setView(baseMap.cord, baseMap.center);

    for (let marker of this.userDataService.getUserData().baseMap.markers) {
      this.mapEditor.addMarker(marker.cord,
        marker.text, this.generateClickFunction(marker));
    }
  }

  generateRunMap(mapId:string){
    let self = this
    let userId = this.userDataService.getUserData().id
    this.api.getRunMap(userId, mapId).subscribe(res =>
    {
      let runMap: RunMap = new RunMap(res)
      self.mapEditor.setView(runMap.center, runMap.zoom)
      self.userDataService.setRunMap(runMap)
      for(let i in runMap.runs){
        this.api.getRun(userId, runMap.runs[i]).subscribe(runRes => {
          console.log("Index: " + i)
          let run: Run = new Run(runRes)
          self.mapEditor.addRun(run, parseInt(i))
          self.userDataService.addRun(run.id)
        })
      }
    })

  }

  /**
   * returns an iterable key value pair of ids and values of availableMaps
   * @return {[string, string][]}
  **/
  fetchMapEntries(): [string, string][]{
    return this.userDataService.getAvailableMaps()
  }

  /**
   * Sets the current map to a particular map with a given id
   * @param {string} mapName The name of the map which we will set as the
   * current map
  **/
  setCurrentMap(mapId: string) {
    if (this.userDataService.getAvailableMaps().find((element) => {return element[0] == mapId})) {
      if(this._currentMapId != mapId){
        this.clearMap()
        this._currentMapId = mapId
        if(mapId == "baseMap"){
          this.generateBaseMap()
        } else {
          this.generateRunMap(mapId)
        }
      }
    } else {
      throw new Error("Invalid MapId \"" + mapId + "\" used.")
    }
  }

  clearMap(){
    this.mapEditor.clearMap()
  }

  /**
   * Gets the current mapId to display
   * @return{string} the current map id
  **/
  getCurrentMap(): string {
    return this._currentMapId;
  }

  //Generates the click function for markers on the base page
  private generateClickFunction(marker: Marker): Function {
    let self = this
    return function() {
      self.setCurrentMap(marker.id);
    }
  }

}
