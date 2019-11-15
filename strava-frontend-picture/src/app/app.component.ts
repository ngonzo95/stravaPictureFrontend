import { Component, OnInit } from '@angular/core';
import { MapSyncService } from './services/map-sync.service';
import { Marker } from './model/marker'
import { UserDataServiceService } from './services/user-data-service.service';
import { BackendApiServiceService } from './services/backend-api-service.service';
import { User } from './model/user';
import { UserResponse } from './response/user-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private mapSync: MapSyncService, private userDataService:UserDataServiceService, private api:BackendApiServiceService) { }

  ngOnInit() {
    this.mapSync.initMap()
  }

}
