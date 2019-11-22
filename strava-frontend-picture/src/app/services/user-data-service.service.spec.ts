import { TestBed } from '@angular/core/testing';
import { UserDataServiceService } from './user-data-service.service';

import { User } from '../model/user';
import { RunMap } from '../model/run-map';



describe('Basic getters and setters', () => {
  let service: UserDataServiceService;
  let mockUser: User
  let mockRunMap: RunMap
  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.get(UserDataServiceService);
    mockUser = {
      "id": "1",
      "email": "ngonzo95@gmail.com",
      "baseMap": {
        "center": 3,
        "cord": [39.8333, -98.58333],
        "markers": [{
          "id": "42",
          "text": "Avon",
          "cord": [40, -100]
        },
        {
          "id": "43",
          "text": "Other Place",
          "cord": [36, -94]
        },
        {
          "id": "44",
          "text": "last",
          "cord": [33, -110]
        }
        ]
      }
    }

    mockRunMap = {
      "id": "44",
      "mapName": "lastPlace",
      "userId": "1",
      "center": [33, -110],
      "zoom": 9,
      "runs": ["6", "7", "8", "9"]
    }
  })

  it("add run should add the run that we want to the set and clear the set when asked", () => {
    service.addRun("test")
    service.addRun("test 2")
    expect(service.getRunList().length).toBe(2)
    service.clearRuns()
    expect(service.getRunList().length).toBe(0)

  });

  it("add runs should add all of the runs", () => {
    service.addRuns(["1","3","5"])
    expect(service.getRunList().length).toBe(3)
    expect(service.getRunList()).toContain("1")
    expect(service.getRunList()).toContain("3")
    expect(service.getRunList()).toContain("5")
  });

  it("findRunsThatAreNotDisplayed determines which of the runs provided are not currently being displayed", () => {
    service.addRuns(["1","3","4","5"])
    let res = service.findRunsThatAreNotDisplayed(["1","2","6","5"])

    expect(res).toContain("2")
    expect(res).toContain("6")
    expect(res).not.toContain("3")

  });

  it("setMap reset runs", () => {
    let nextRunMap: RunMap = {
      "id": "43",
      "mapName": "OtherPlace",
      "userId": "1",
      "center": [36, -94],
      "zoom": 6,
      "runs": ["4", "5"]
    }

    service.setRunMap(mockRunMap)
    service.addRuns(["1","3","5"])
    service.setRunMap(nextRunMap)
    expect(service.getRunList()).toEqual([])
  });

  it("getAvailableMaps should return what maps the user has", () => {
    service.setUserData(mockUser)
    expect(service.getAvailableMaps()).toEqual([["baseMap", "Base Map"],["42", "Avon"], ["43", "Other Place"], ["44", "last"]]);
  });
});
