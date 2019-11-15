//A service layer for all calls to leafletjs so that other service methods can
//be more easily unit tested
import { Injectable } from '@angular/core';
//Provides acess to leafletjs
declare let L;
import { LatLng, Map as LeafletMap, Icon, Polyline } from "leaflet"
import { Run } from '../model/run';

@Injectable({
  providedIn: 'root'
})
export class MapEditorService {
  private icon: Icon //The Icons to use as markers
  private map: LeafletMap
  private _runs: Map<string, Polyline> = new Map()

  constructor() {
    this.icon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png'
    })
  }

  createNewMap() {
    this.map = L.map("map")
    this.addBaseTileLayer()
    this.setView([0,0], 2)

    // this.maps.set(name, this.map)

  }

  addRun(run:Run, colorIndex: number){
    console.log("colorIndex: " + colorIndex)
    let color:string = this.getColor(colorIndex)
    let line = L.polyline(run.gpx, {color:color}).addTo(this.map)
    this._runs.set(run.id, line)
  }

  setView(center: Number[], defaultZoom: number) {
    let centerCord: LatLng = L.latLng(center[0], center[1])
    this.map.setView(centerCord, defaultZoom);
  }

  addMarker(loc: Number[], text: String, clickFunction: Function) {
    let cord: LatLng = L.latLng(loc[0], loc[1])

    L.marker(cord, { icon: this.icon, title: text })
      .on("click", clickFunction)
      .addTo(this.map)
  }

  clearMap(){
    this.map.eachLayer((layer) => {
      this.map.removeLayer(layer)
    })
    this._runs = new Map()
    this.addBaseTileLayer()
  }

  private getColor(colorIndex: number): string {

    let startColor = [0.05, 0.11, 1]
    let endColor = [1,0,0.35]
    let color= []

    for (let i in startColor){
      let num = startColor[i] + (endColor[i]-startColor[i])* colorIndex/30
      color.push(num)
    }

    let hexColors = [Math.round(color[0]*255),Math.round(color[1]*255),Math.round(color[2]*255)]

    let colorStr = "#" + ((1 << 24) + (hexColors[0] << 16) + (hexColors[1] << 8) + hexColors[2]).toString(16).slice(1);
    console.log("color for index " + colorIndex + ": " + colorStr)
    return colorStr



  }

  private addBaseTileLayer(){
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
      {
        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
        "detectRetina": false,
        "maxZoom": 18,
        "minZoom": 1,
        "noWrap": false,
        "subdomains": "abc"
      }).addTo(this.map);

  }
}
