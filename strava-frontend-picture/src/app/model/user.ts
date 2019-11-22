import { Marker } from './marker';
import { UserResponse, BaseMapResponse, MarkerResponse } from '../response/user-response';

export class User {
  id: string
  email: string
  baseMap: BaseMap
  constructor()
  constructor(userResponse: UserResponse)
  constructor(userResponse?: UserResponse) {
    if (userResponse != null) {
      this.id = userResponse.id
      this.email = userResponse.email
      this.baseMap = new BaseMap(userResponse.baseMap)
    } else {
      this.baseMap = new BaseMap()
    }
  }

  static copy(user: User): User {
    let newUser = new User()
    newUser.id = user.id
    newUser.email = user.email
    newUser.baseMap = BaseMap.copy(user.baseMap)
    return newUser
  }
}

export class BaseMap {
  zoom: number
  center: [number, number]
  markers: Marker[]

  constructor()
  constructor(baseMapResponse: BaseMapResponse)
  constructor(baseMapResponse?: BaseMapResponse) {
    if (baseMapResponse != null) {
      this.center = baseMapResponse.center
      this.zoom = baseMapResponse.zoom
      this.markers = []
      for (let markerResponse of baseMapResponse.markers) {
        this.markers.push(new Marker(markerResponse.mapId, markerResponse.text,
          markerResponse.cord))
      }
    } else {
      this.markers = []
    }
  }
  static copy(baseMap: BaseMap): BaseMap {
    let newBaseMap = new BaseMap
    newBaseMap.zoom = baseMap.zoom
    newBaseMap.center = [baseMap.center[0], baseMap.center[1]]
    newBaseMap.markers = []
    for (let marker of baseMap.markers){
      newBaseMap.markers.push(Marker.copy(marker))
    }
    return newBaseMap
  }
}
