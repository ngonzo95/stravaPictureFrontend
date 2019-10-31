import { Injectable } from '@angular/core';
import { MapEditorService } from './map-editor.service';
import { Marker } from '../model/marker'

@Injectable({
  providedIn: 'root'
})
export class MapSyncService {

  private _currentMapId: string;
  private _availableMaps: Map<string, string>

  constructor(private mapEditor: MapEditorService) {
    this._currentMapId = "baseMap";
    this._availableMaps = new Map();

  }
  /**
   * This generates the homepage which is a basic map set at a predecided
   * location
  **/
  generateBaseMap() {
    this.mapEditor.createNewMap('baseMap')
    this.mapEditor.setView('baseMap', [39.8333, -98.58333], 3);
    this._availableMaps.set("baseMap", "Base Map");
  }
  /**
   * fills the base map with markers
   * @param {Marker[]} markerList all the markers that are to be added to the
   * base map
  **/
  fillBaseMap(markerList: Marker[]) {
    for (let marker of markerList) {
      this.mapEditor.addMarker('baseMap', marker.cord,
        marker.text, this.generateClickFunction(marker));

      this._availableMaps.set(marker.id, marker.text)
    }
  }

  /**
   * This function returns the ids of all of the maps that we can choose from
   * @return {IterableIterator<string>} iterator representing the ids for all
   * available maps
  **/
  fetchMapIds(): IterableIterator<string> {
    return this._availableMaps.keys();
  }

  /**
   * returns an iterable key value pair of ids and values of availableMaps
   * @return {IterableIterator<string>}
  **/
  fetchMapEntries(): IterableIterator<[string, string]>{
    return this._availableMaps.entries()
  }

  /**
   * Sets the current map to a particular map with a given id
   * @param {string} mapName The name of the map which we will set as the
   * current map
  **/
  setCurrentMap(mapId: string) {
    if (this._availableMaps.has(mapId)) {
      this._currentMapId = mapId
      console.log(this._currentMapId)
    } else {
      throw new Error("Invalid MapId \"" + mapId + "\" used.")
    }
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
