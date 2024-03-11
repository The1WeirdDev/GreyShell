import {Vector3} from "/utils/Utils/Vector.js"
import MatrixUtils from "/utils/Utils/MatrixUtils.js"

export default class Transform{
    constructor(){
        this.position = new Vector3(0,0,0);
        this.rotation = new Vector3(0,0,0);
        this.scale = new Vector3(1,1,1);
        this.matrix = mat4.create();
        //Typeof matrix will by default be transformation_matrix
        //Some cases will be view_matrix
    }

    SetScaleXYZ(x, y, z){
      this.scale.x = x;
      this.scale.y = y;
      this.scale.z = z;
    }
    CalculateTransformationMatrix(){
      MatrixUtils.UpdateTransformationMatrixFromTransform(this.matrix, this);
    }
    CalculateViewMatrix(){
      MatrixUtils.UpdateViewMatrixFromTransform(this.matrix, this);
    }

    Reset(){
      this.position.x = 0;
      this.position.y = 0;
      this.position.z = 0;
      this.rotation.x = 0;
      this.rotation.y = 0;
      this.rotation.z = 0;
      this.scale.x = 0;
      this.scale.y = 0;
      this.scale.z = 0;
    }
}
