import { Vector3 } from "/utils/Utils/Vector.js";

export default class Entity {
  constructor() {
    this.position = new Vector3();
    this.scale = new Vector3();
    this.rotation = new Vector3();
  }

  Update() {}

  Draw() {}
}
