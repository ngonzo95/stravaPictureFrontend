export class Marker {
  id: string
  text: string
  cord: number[]

  constructor(id:string, text:string, cord:number[]){
    this.id = id;
    this.text = text;
    this.cord = cord;
  }

  static copy (marker: Marker): Marker{
    return new Marker(marker.id, marker.text, [...marker.cord])

  }
}
