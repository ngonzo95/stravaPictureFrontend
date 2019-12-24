
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserResponse } from '../response/user-response'
import { RunResponse } from '../response/run-response'
import { RunMapResponse } from '../response/run-map-response'

import { BackendApiServiceService } from './backend-api-service.service';

describe('BackendApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule] }));

  it('should be created', () => {
    const service: BackendApiServiceService = TestBed.get(BackendApiServiceService);
    expect(service).toBeTruthy();
  });
});

describe('GetUser', () => {
  let injector: TestBed;
  let service: BackendApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [BackendApiServiceService]

      });

    injector = getTestBed();
    service = injector.get(BackendApiServiceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the user', () => {
    let userId: string = "1"
    const dummyUsers = {
      "id": userId,
      "email": "ngonzo95@gmail.com",
      "baseMap": {
        "center": 3,
        "cord": [39.8333, -98.58333],
        "markers": [{
            "mapId": "42",
            "text": "Avon",
            "cord": [40, -100]
          },
          {
            "mapId": "43",
            "text": "Other Place",
            "cord": [36, -94]
          },
          {
            "mapId": "44",
            "text": "last",
            "cord": [33, -110]
          }
        ]
      }
    }
    service.getUser(userId).subscribe((user: UserResponse) => {
      expect(user.id).toBe(userId);
      expect(user.email).toBe("ngonzo95@gmail.com");
      expect(user.basemap.markers[0].mapId).toBe("42");
    });

    const req = httpMock.expectOne('http://localhost:4200/user/' + userId);
    expect(req.request.method).toBe("GET");
    req.flush(dummyUsers);

  });
});

describe('GetRun', () => {
  let injector: TestBed;
  let service: BackendApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [BackendApiServiceService]

      });

    injector = getTestBed();
    service = injector.get(BackendApiServiceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the ', () => {
    const dummyRun = {
      "id":"65",
      "userId": "1",
      "name": "Morning Run",
      "polyline": "some polyline"
    }
    service.getRun("1", "65" ).subscribe((run: RunResponse) => {
      expect(run.id).toBe("65");
      expect(run.userId).toBe("1");
      expect(run.name).toBe("Morning Run");
      expect(run.polyline).toEqual("some polyline");
    });

    let reqString = 'http://localhost:4200/user/1/run/65'

    const req = httpMock.expectOne(reqString);
    expect(req.request.method).toBe("GET");
    req.flush(dummyRun);

  });
});

describe('GetRunMaps', () => {
  let injector: TestBed;
  let service: BackendApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        imports: [HttpClientTestingModule],
        providers: [BackendApiServiceService]

      });

    injector = getTestBed();
    service = injector.get(BackendApiServiceService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return the desired runMap infromation', () => {
    const dummyRunMap = {
      "id": "44",
      "mapName": "lastPlace",
      "userId": "1",
      "center": [33, -110],
      "zoom": 9,
      "runs": ["6", "7", "8", "9"]
    }
    service.getRunMap("1", "44" ).subscribe((runMap: RunMapResponse) => {
      expect(runMap.id).toBe("44");
      expect(runMap.userId).toBe("1");
      expect(runMap.runs).toEqual(["6", "7", "8", "9"]);
    });

    let reqString = 'http://localhost:4200/user/1/run_map/44'

    const req = httpMock.expectOne(reqString);
    expect(req.request.method).toBe("GET");
    req.flush(dummyRunMap);

  });
});
