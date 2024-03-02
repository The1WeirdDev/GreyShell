import { Vector3 } from "/utils/Utils/Vector.js";
import Keyboard from "/utils/Utils/Input/Keyboard.js";
import Mouse from "/utils/Utils/Input/Mouse.js";
import Time from "/utils/Utils/Time.js";
import Mathf from "/utils/Utils/Mathf.js";

export default class Entity {
  constructor() {
    this.position = new Vector3();
    this.scale = new Vector3();
    this.rotation = new Vector3();
  }

  Update() {
    if (Keyboard.IsKeyDown(87)) {
      //MoveBack
      this.position.x += Math.sin(this.rotation.y) * Time.delta_time;
      this.position.z -= Math.cos(this.rotation.y) * Time.delta_time;
    }
    if (Keyboard.IsKeyDown(83)) {
      this.position.x -= Math.sin(this.rotation.y) * Time.delta_time;
      this.position.z += Math.cos(this.rotation.y) * Time.delta_time;
    }

    if (Keyboard.IsKeyDown(65)) {
      //MoveBack
      this.position.x += Math.sin(this.rotation.y - 1.5708) * Time.delta_time;
      this.position.z -= Math.cos(this.rotation.y - 1.5708) * Time.delta_time;
    }

    if (Keyboard.IsKeyDown(68)) {
      this.position.x -= Math.sin(this.rotation.y - 1.5708) * Time.delta_time;
      this.position.z += Math.cos(this.rotation.y - 1.5708) * Time.delta_time;
    }

    if(Keyboard.IsKeyDown(32)){
      this.position.y += Time.delta_time;
    }
    if(Keyboard.IsKeyDown(16)){
      this.position.y -= Time.delta_time;
    }

    this.rotation.y += Mouse.delta.x * 0.0174533;
    this.rotation.z -= Mouse.delta.y * 0.0174533;

    this.rotation.z = Mathf.Clamp(this.rotation.z, -1.5708, 1.5708);
  }

  Draw() {}
}
