import { Component, OnInit } from '@angular/core';
import { MapSyncService } from './services/map-sync.service';
import { Marker } from './model/marker'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private mapSync: MapSyncService) { }

  ngOnInit() {
    this.mapSync.generateBaseMap()

    let markerList: Marker[] = [];

    markerList.push(new Marker("map1", "test", [41,-96]))
    markerList.push(new Marker("map2", "test 2", [43,-92]))

    this.mapSync.fillBaseMap(markerList)

  }

}
