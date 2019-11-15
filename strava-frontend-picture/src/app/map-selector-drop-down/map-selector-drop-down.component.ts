import { Component, OnInit } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MapSyncService } from '../services/map-sync.service';
import { UserDataServiceService } from '../services/user-data-service.service';


@Component({
  selector: 'map-selector-drop-down',
  templateUrl: './map-selector-drop-down.component.html',
  styleUrls: ['./map-selector-drop-down.component.css']
})
export class MapSelectorDropDownComponent implements OnInit {
  dropDownEntries: [string, string][];
  private _subscription
  constructor(private mapSync: MapSyncService, private userDataService: UserDataServiceService) { }

  ngOnInit() {
    this.dropDownEntries = this.userDataService.getAvailableMaps()
    this._subscription = this.userDataService.availableMaps
      .subscribe((value) => this.dropDownEntries = value)

  }

  selectMap(mapId: string) {
    this.mapSync.setCurrentMap(mapId);
  }

}
