import { Component, OnInit } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { MapSyncService } from '../services/map-sync.service';


@Component({
  selector: 'map-selector-drop-down',
  templateUrl: './map-selector-drop-down.component.html',
  styleUrls: ['./map-selector-drop-down.component.css']
})
export class MapSelectorDropDownComponent implements OnInit {
  dropDownEntries:[string, string][];
  constructor(private mapSync: MapSyncService) { }

  ngOnInit() {
    this.dropDownEntries = Array.from(this.mapSync.fetchMapEntries());
  }

  selectMap(mapId: string){
    this.mapSync.setCurrentMap(mapId);
  }

}
