import Hitbox from "./Hitbox.js"
import {Vector3} from "/utils/Utils/Vector.js"
export default class AABBHitbox extends Hitbox{
  constructor(position, size){
    super();

    if(size == null)size = new Vector3(1,1,1);
    this.size = size;
  }

  IsVectorInside(vector3){
    return vector3.x >= this.position.x && vector3.x < this.position.x + this.size.x && vector3.y >= this.position.y && vector3.y < this.position.y + this.size.y  && vector3.z >= this.position.z && vector3.z < this.position.z + this.size.z;
  }
}
