import { TestBed } from '@angular/core/testing';

import { MapSyncService } from './map-sync.service';
import { MapEditorService } from './map-editor.service';
import { Marker } from '../model/marker'
import { MockedMapEditorService } from '../mock/mock-map-editor-service'
import { UserDataServiceService } from './user-data-service.service';
import { User, BaseMap } from '../model/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('MapSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  it('should be created', () => {
    const service: MapSyncService = TestBed.get(MapSyncService);
    expect(service).toBeTruthy();
  });
});

describe('generateBaseMap', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  let userDataService: UserDataServiceService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService },
        UserDataServiceService
      ]
    })

    service = TestBed.get(MapSyncService);
    userDataService = TestBed.get(UserDataServiceService);
  })

  it('should set the default center and zoom correctly and place the markers', () => {
    //arrange
    mapEditorService.actions = []
    let name: string = "baseMap";
    let user: User = new User();
    user.baseMap.zoom = 4;
    user.baseMap.center = [39.8333, -98.58334]

    user.baseMap.markers.push(new Marker("markerId1", "test", [41, -96]))
    user.baseMap.markers.push(new Marker("markerId2", "test 2", [43, -92]))

    userDataService.setUserData(user)

    //act
    service.generateBaseMap()

    //assert
    expect(mapEditorService.actions[0]).toBe("SetView [39.8333,-98.58334] 4")
    expect(mapEditorService.actions[1]).toBe("addMarker [41,-96] test")
    expect(mapEditorService.actions[2]).toBe("addMarker [43,-92] test 2")
  })
});

describe('currentMap', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  let userDataService: UserDataServiceService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService },
        UserDataServiceService
      ]
    })

    service = TestBed.get(MapSyncService);
    userDataService = TestBed.get(UserDataServiceService)
  })

  it('should default to baseMap when first generated', () => {
    let user: User = new User();
    user.baseMap = new BaseMap();
    user.baseMap.zoom = 4;
    user.baseMap.center = [39.8333, -98.58334]
    userDataService.setUserData(user)

    service.generateBaseMap();
    expect(service.getCurrentMap()).toBe("baseMap")
  });

  it('should switch to a different map id when another is selected', () => {
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    let user: User = new User()
    let baseMap: BaseMap = new BaseMap()
    baseMap.markers = markerList
    user.baseMap = baseMap
    user.baseMap.center = [1, 2]
    userDataService.setUserData(user)

    service.setCurrentMap("markerId1");
    expect(service.getCurrentMap()).toBe("markerId1")
  });

  it('should stay the same when an invalid map is set and throw an exception', () => {
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    let user: User = new User()
    user.baseMap.markers = markerList
    user.baseMap.center = [1, 2]
    userDataService.setUserData(user)

    service.setCurrentMap("markerId1");
    expect(function() { service.setCurrentMap("someInvalidId") })
      .toThrow(new Error("Invalid MapId \"someInvalidId\" used."))
    expect(service.getCurrentMap()).toBe("markerId1")
  });


});

describe('fetchMapEntries', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  let userDataService: UserDataServiceService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService },
        UserDataServiceService
      ]
    })

    service = TestBed.get(MapSyncService);
    userDataService = TestBed.get(UserDataServiceService)
  })

  it('should return all the key value pairs in the map', () => {
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    let user: User = new User()
    let baseMap: BaseMap = new BaseMap()
    baseMap.markers = markerList
    user.baseMap = baseMap
    user.baseMap.center = [1, 2]
    userDataService.setUserData(user)

    let availableMaps: [string, string][] = service.fetchMapEntries();
    expect(availableMaps).toContain(["baseMap", "Base Map"]);
    expect(availableMaps).toContain(["markerId1", "test"]);
    expect(availableMaps).toContain(["markerId2", "test 2"]);
  });

});
