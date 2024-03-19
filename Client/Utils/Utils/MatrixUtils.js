export default class MatrixUtils {
  static GenerateTransformationMatrixFromTransform(transform){
    //Rotation should be in radians
    var matrix = mat4.create();
    mat4.translate(matrix, matrix, [transform.position.x, transform.position.y, transform.position.z]);
    mat4.rotate(matrix, matrix, transform.rotation.x, [1, 0, 0]);
    mat4.rotate(matrix, matrix, transform.rotation.y, [0, 1, 0]);
    mat4.rotate(matrix, matrix, transform.rotation.z, [0, 0, 1]);
    mat4.scale(matrix, matrix, [transform.scale.x, transform.scale.y, transform.scale.z]);
    return matrix;
  }
  static UpdateTransformationMatrixFromTransform(matrix, transform){
    mat4.identity(matrix);
    mat4.translate(matrix, matrix, [transform.position.x, transform.position.y, transform.position.z]);
    mat4.rotate(matrix, matrix, transform.rotation.x, [1, 0, 0]);
    mat4.rotate(matrix, matrix, transform.rotation.y, [0, 1, 0]);
    mat4.rotate(matrix, matrix, transform.rotation.z, [0, 0, 1]);
    mat4.scale(matrix, matrix, [transform.scale.x, transform.scale.y, transform.scale.z]);
    return matrix;
  }
  static UpdateViewMatrixFromTransform(matrix, transform){
    matrix = mat4.identity(matrix);

    mat4.rotate(matrix, matrix, transform.rotation.z, [1, 0, 0]);
    mat4.rotate(matrix, matrix, transform.rotation.y, [0, 1, 0]);
    mat4.rotate(matrix, matrix, transform.rotation.x, [0, 0, 1]);
    mat4.translate(matrix, matrix, [-transform.position.x, -transform.position.y, -transform.position.z]);
    return matrix;
  }
  static GenerateTransformationMatrix(position, rotation, scale) {
    //Rotation should be in radians
    var matrix = mat4.create();
    mat4.translate(matrix, matrix, [position.x, position.y, position.z]);
    mat4.rotate(matrix, matrix, rotation.x, [1, 0, 0]);
    mat4.rotate(matrix, matrix, rotation.y, [0, 1, 0]);
    mat4.rotate(matrix, matrix, rotation.z, [0, 0, 1]);
    mat4.scale(matrix, matrix, scale);
    return matrix;
  }

  static GenerateViewMatrix(position, rotation) {
    //Rotation should be in radians
    var matrix = mat4.create();
    mat4.rotate(matrix, matrix, rotation.z, [1, 0, 0]);
    mat4.rotate(matrix, matrix, rotation.y, [0, 1, 0]);
    mat4.rotate(matrix, matrix, rotation.x, [0, 0, 1]);
    mat4.translate(matrix, matrix, [-position.x, -position.y, -position.z]);
    return matrix;
  }
}
