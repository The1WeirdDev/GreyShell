import {Vector3} from "/utils/Utils/Vector.js"

export default class PointLight{
   constructor(){
     this.position = new Vector3();
     this.color = new Vector3(1,1,1);

     this.range = 100;
     this.constant = 1;
     this.linear = 0.09;
     this.quadratic = 0.032;

     this.CalculateAttenuation();
   }

   CalculateAttenuation(){
     this.linear = 4.5 / this.range;
     this.quadratic = 75 / (this.range * this.range);
   }

   SetRange(range){
     this.range = range;
     this.CalculateAttenuation();
   }

   SetPosition(vector3){
     this.position.x = vector3.x;
     this.position.y = vector3.y;
     this.position.z = vector3.z;
   }
   SetPositionXYZ(x, y, z){
     this.position.x = x;
     this.position.y = y;
     this.position.z = z;
   }

   SetColorRGB(r, g, b){
     this.color.x = r / 255;
     this.color.y = g / 255;
     this.color.z = b / 255;
   }

   LoadValuesToShader(shader, light_index){
     shader.LoadVector3Values(shader.points_lights[light_index].position_loc, this.position);
     shader.LoadVector3Values(shader.points_lights[light_index].color_loc, this.color);
     shader.LoadFloat(shader.points_lights[light_index].constant_loc, this.constant);
     shader.LoadFloat(shader.points_lights[light_index].linear_loc, this.linear);
     shader.LoadFloat(shader.points_lights[light_index].quadratic_loc, this.quadratic);
   }
}