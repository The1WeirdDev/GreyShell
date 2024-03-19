import {Vector3} from "/utils/Utils/Vector.js"
export default class Hitbox{
  constructor(position){
    if(position == null)position = new Vector3(0,0,0);

    this.position = position;
  }
}
