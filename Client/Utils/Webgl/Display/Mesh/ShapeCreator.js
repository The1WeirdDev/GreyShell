import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js"
import NormalMesh from "/utils/Webgl/Display/Mesh/NormalMesh.js"

export default class ShapeCreator{
  static CreateCubeNormalMesh(mesh){
    if(!mesh)mesh = new NormalMesh();

    mesh.Create(
      [0,0,0, 0,1,0, 1,0,0, 1,1,0,
			0,0,1, 0,1,1, 1,0,1, 1,1,1,
			0,1,0, 1,1,0, 0,1,1, 1,1,1,
			0,0,0, 0,1,0, 0,0,1, 0,1,1,
		  1,0,0, 1,1,0, 1,0,1, 1,1,1,
      1,0,0, 1,0,1, 0,0,0, 0,0,1],
			[0,1,2,2,1,3, 4,5,6,6,5,7, 8,9,10,10,9,11, 12,13,14,14,13, 15, 16, 17, 18,18,17,19, 20,21,22,22,21,23],
			[0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
			0,0,1, 0,0,1, 0,0,1, 0,0,1,
			0,1,0, 0,1,0, 0,1,0, 0,1,0,
			-1, 0,0, -1,0,0, -1,0,0, -1,0,0,
		  1, 0,0, 1,0,0, 1,0,0, 1,0,0,
      0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0],
			3
    );

    return mesh;
  }
}
