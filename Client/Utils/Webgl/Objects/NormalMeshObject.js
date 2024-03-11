import NormalMesh from "/utils/Webgl/Display/Mesh/NormalMesh.js"
import Transform from "/utils/Utils/Transform.js"

export default class NormalMeshObject{
  constructor(mesh, transform){
    if(typeof(mesh) != "NormalMesh")
      mesh = new NormalMesh();
    if(typeof(transform) != "Transform")
      transform = new Transform();

    this.mesh = mesh;
    this.transform = transform;
  }

  CreateMesh(vertices, indices, normals, dimensions){
    this.mesh.Create(vertices, indices, normals, dimensions);
  }

  ResetTransform(){
    this.transform.Reset();
  }
}
