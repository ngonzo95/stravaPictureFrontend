export class MockedMapEditorService {
  public maps: Map<String, String[]>
  public icon
  constructor() {
    this.maps = new Map();
  }

  createNewMap(name: String) {
    this.maps.set(name, [])
  }
  addMarker(name: String, loc: Number[], text: String, clickFunction: Function) {
    let actions: String[] = this.maps.get(name)
    actions.push("addMarker [" + loc + "] " + text)
  }
  setView(name: String, center: Number[], defaultZoom: number) {
    let actions: String[] = this.maps.get(name)
    actions.push("SetView [" + center + "] " + defaultZoom)
  }


}
