import {Vector3} from "/utils/Utils/Vector3.js"

export default class Ray{
  constructor(position, direction){
    if(position == null)position = new Vector3(0,0,0);
    if(direction == null)direction = new Vector3(0,0,0);

    this.position = position;
    this.direction = direction;
  }

  NormalizeDirection(){
    this.direction.Normalize();
  }
}
