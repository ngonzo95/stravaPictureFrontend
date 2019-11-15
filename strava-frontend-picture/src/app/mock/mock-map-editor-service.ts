export class MockedMapEditorService {
  public actions:String[] = []
  public icon
  constructor() {
  }

  createNewMap() {
    this.actions.push("createNewMap")
  }

  addMarker(loc: Number[], text: String, clickFunction: Function) {
    this.actions.push("addMarker [" + loc + "] " + text)
  }

  setView(center: Number[], defaultZoom: number) {
    this.actions.push("SetView [" + center + "] " + defaultZoom)
  }

  clearMap(){
    this.actions.push("clearMap")
  }



}
