import { TestBed } from '@angular/core/testing';

import { MapSyncService } from './map-sync.service';
import { MapEditorService } from './map-editor.service';
import { Marker } from '../model/marker'
import { MockedMapEditorService } from '../mock/mock-map-editor-service'


describe('MapSyncService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapSyncService = TestBed.get(MapSyncService);
    expect(service).toBeTruthy();
  });
});

describe('generateBaseMap', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService }
      ]
    })

    service = TestBed.get(MapSyncService);
  })

  it('should create a new map and set the default center and zoom correctly', () => {
    service.generateBaseMap()
    expect(mapEditorService.maps.has('baseMap'));
    expect(mapEditorService.maps.get('baseMap')[0]).toBe("SetView [39.8333,-98.58333] 3")
  })
});

describe('fillBaseMap', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService }
      ]
    })

    service = TestBed.get(MapSyncService);
  })

  it('should add markers to the exisiting map', () => {
    let name: string = "baseMap";
    mapEditorService.maps.set(name, [])
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    service.fillBaseMap(markerList);

    expect(mapEditorService.maps.has(name));
    expect(mapEditorService.maps.get(name)[0]).toBe("addMarker [41,-96] test")
    expect(mapEditorService.maps.get(name)[1]).toBe("addMarker [43,-92] test 2")
  })

  it('should add maps as available but not generate the maps', () => {
    let name: string = "baseMap"
    service.generateBaseMap()
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    service.fillBaseMap(markerList);

    //enusre that the basemap has been generated but nothing else
    expect(mapEditorService.maps.has(name));
    expect(mapEditorService.maps.has("markerId1")).toBeFalsy();
    expect(mapEditorService.maps.has("markerId2")).toBeFalsy();

    //enusre that the maps have been added to the available maps
    let availableMaps: string[] = Array.from(service.fetchMapIds());
    expect(availableMaps).toContain(name);
    expect(availableMaps).toContain("markerId1");
    expect(availableMaps).toContain("markerId2");


  })
})

describe('currentMap', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService }
      ]
    })

    service = TestBed.get(MapSyncService);
  })

  it('should default to baseMap when first generated', () => {
    service.generateBaseMap();
    expect(service.getCurrentMap()).toBe("baseMap")
  });

  it('should switch to a different map id when another is selected', () => {
    service.generateBaseMap();
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    service.fillBaseMap(markerList);

    service.setCurrentMap("markerId1");
    expect(service.getCurrentMap()).toBe("markerId1")
  });

  it('should stay the same when an invalid map is set and throw an exception', () => {
    service.generateBaseMap();
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    service.fillBaseMap(markerList);

    service.setCurrentMap("markerId1");
    expect(function() { service.setCurrentMap("someInvalidId") })
      .toThrow(new Error("Invalid MapId \"someInvalidId\" used."))
    expect(service.getCurrentMap()).toBe("markerId1")
  });


});

describe('fetchMapEntries', () => {
  let service: MapSyncService;
  let mapEditorService: MockedMapEditorService
  beforeEach(() => {
    mapEditorService = new MockedMapEditorService();
    TestBed.configureTestingModule({
      providers: [
        MapSyncService,
        { provide: MapEditorService, useValue: mapEditorService }
      ]
    })

    service = TestBed.get(MapSyncService);
  })

  it('should return all the key value pairs in the map', () => {
    service.generateBaseMap();
    let markerList: Marker[] = [];

    markerList.push(new Marker("markerId1", "test", [41, -96]))
    markerList.push(new Marker("markerId2", "test 2", [43, -92]))
    service.fillBaseMap(markerList);

    let availableMaps: [string, string][] = Array.from(service.fetchMapEntries());
    expect(availableMaps).toContain(["baseMap", "Base Map"]);
    expect(availableMaps).toContain(["markerId1", "test"]);
    expect(availableMaps).toContain(["markerId2", "test 2"]);
  });

});
