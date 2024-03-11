import { Vector3 } from "/utils/Utils/Vector.js";
import Keyboard from "/utils/Utils/Input/Keyboard.js";
import Mouse from "/utils/Utils/Input/Mouse.js";
import Time from "/utils/Utils/Time.js";
import Mathf from "/utils/Utils/Mathf.js";
import Transform from "/utils/Utils/Transform.js"

export default class Entity {
  constructor() {
    this.transform = new Transform();
  }

  Update() {
    if (Keyboard.IsKeyDown(87)) {
      //MoveBack
      this.transform.position.x += Math.sin(this.transform.rotation.y) * Time.delta_time;
      this.transform.position.z -= Math.cos(this.transform.rotation.y) * Time.delta_time;
    }
    if (Keyboard.IsKeyDown(83)) {
      this.transform.position.x -= Math.sin(this.transform.rotation.y) * Time.delta_time;
      this.transform.position.z += Math.cos(this.transform.rotation.y) * Time.delta_time;
    }

    if (Keyboard.IsKeyDown(65)) {
      //MoveBack
      this.transform.position.x += Math.sin(this.transform.rotation.y - 1.5708) * Time.delta_time;
      this.transform.position.z -= Math.cos(this.transform.rotation.y - 1.5708) * Time.delta_time;
    }

    if (Keyboard.IsKeyDown(68)) {
      this.transform.position.x -= Math.sin(this.transform.rotation.y - 1.5708) * Time.delta_time;
      this.transform.position.z += Math.cos(this.transform.rotation.y - 1.5708) * Time.delta_time;
    }

    if(Keyboard.IsKeyDown(32)){
      this.transform.position.y += Time.delta_time;
    }
    if(Keyboard.IsKeyDown(16)){
      this.transform.position.y -= Time.delta_time;
    }

    this.transform.rotation.y += Mouse.delta.x * 0.0174533;
    this.transform.rotation.z -= Mouse.delta.y * 0.0174533;

    while(this.transform.rotation.y < 0)
      this.transform.rotation.y += 6.28319;
    while(this.transform.rotation.y > 6.28319)
      this.transform.rotation.y -= 6.28319;

    this.transform.rotation.z = Mathf.Clamp(this.transform.rotation.z, -1.5708, 1.5708);
    this.transform.CalculateViewMatrix();
  }

  Draw() {}
}
