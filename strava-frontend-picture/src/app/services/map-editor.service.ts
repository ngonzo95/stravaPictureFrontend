//A service layer for all calls to leafletjs so that other service methods can
//be more easily unit tested
import { Injectable } from '@angular/core';
//Provides acess to leafletjs
declare let L;
import { LatLng, Map as LeafletMap, Icon } from "leaflet"

@Injectable({
  providedIn: 'root'
})
export class MapEditorService {
  private maps: Map<String, LeafletMap> // A map that has all of the leafletjs maps
  private icon: Icon //The Icons to use as markers

  constructor() {
    this.maps = new Map();
    this.icon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/leaflet/images/marker-icon.png',
      shadowUrl: 'assets/leaflet/images/marker-shadow.png'
    })
  }

  createNewMap(name: String) {
    let map: LeafletMap = L.map(name);

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
      {
        "attribution": "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>",
        "detectRetina": false,
        "maxZoom": 18,
        "minZoom": 1,
        "noWrap": false,
        "subdomains": "abc"
      }).addTo(map);

    this.maps.set(name, map)

  }

  setView(name: String, center: Number[], defaultZoom: number) {
    let centerCord: LatLng = L.latLng(center[0], center[1])
    this.maps.get(name).setView(centerCord, defaultZoom);
  }

  addMarker(name: String, loc: Number[], text: String, clickFunction: Function) {

    let map = this.maps.get(name);
    let cord: LatLng = L.latLng(loc[0], loc[1])

    L.marker(cord, { icon: this.icon, title: text })
      .on("click", clickFunction)
      .addTo(map)
  }
}
