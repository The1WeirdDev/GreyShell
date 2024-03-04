export default class Vector3{
    constructor(x, y, z){
        this.x = x | 0;
        this.y = y | 0;
        this.z = z | 0;
    }
    GetMagnitude(){
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z *this.z);
    }
}