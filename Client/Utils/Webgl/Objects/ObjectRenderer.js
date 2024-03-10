import NormalMeshObject from "/utils/Webgl/Objects/NormalMeshObject.js"

export default class ObjectRenderer{
  static DrawNormalMeshObject(shader, object){
    shader.LoadMatrix4x4(shader.transformation_matrix_location, object.transform.matrix);
    object.mesh.Draw();
  }
}
