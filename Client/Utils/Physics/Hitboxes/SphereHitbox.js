import Hitbox from "./Hitbox.js"
export default class SphereHitbox extends Hitbox{
  constructor(position, radius){
    super();
    this.radius = radius;
  }
}
