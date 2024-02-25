export default class MatrixUtils {
  static GenerateViewMatrix(position, rotation, scale) {
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
