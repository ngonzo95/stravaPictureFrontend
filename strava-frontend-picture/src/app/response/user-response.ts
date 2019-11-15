export interface UserResponse {
  id: string
  email: string
  baseMap: BaseMapResponse
}

export interface BaseMapResponse {
  center: number
  cord: [number, number]
  markers: MarkerResponse[]
}

export interface MarkerResponse {
  mapId: string
  text: string
  cord: [number, number]
}
