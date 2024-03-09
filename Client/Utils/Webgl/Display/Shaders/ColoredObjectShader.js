import Globals from "/utils/Webgl/Globals.js";
import Shader from "/utils/Webgl/Display/Shader.js";

export default class ColoredObjectShader extends Shader {
  static vertex_data = `
        precision mediump float;
        attribute vec3 position;

        uniform mat4 projection_matrix;
        uniform mat4 view_matrix;
        uniform mat4 transformation_matrix;

        void main() {
                gl_Position = projection_matrix * view_matrix * transformation_matrix * vec4(position, 1);
        }
	`;
  static fragment_data = `
		precision mediump float;
		
		uniform vec3 color;
		
		void main() {
			gl_FragColor = vec4(color, 1);
		}
	`;
  constructor() {
    super();
  }

  Create() {
    this.CreateShaders(
      ColoredObjectShader.vertex_data,
      ColoredObjectShader.fragment_data,
    );
    this.projection_matrix_location =
      this.GetUniformLocation("projection_matrix");
    this.view_matrix_location = this.GetUniformLocation("view_matrix");
    this.transformation_matrix_location = this.GetUniformLocation(
      "transformation_matrix",
    );
    this.color_location = this.GetUniformLocation("color");
  }

  LoadProjectionMatrix(matrix) {
    this.LoadMatrix4x4(this.projection_matrix_location, matrix);
  }

  LoadViewMatrix(matrix) {
    this.LoadMatrix4x4(this.view_matrix_location, matrix);
  }

  LoadTransformationMatrix(matrix) {
    this.LoadMatrix4x4(this.transformation_matrix_location, matrix);
  }

  LoadColorRGB(r, g, b) {
    this.LoadVector3(this.color_location, r / 255, g / 255, b / 255);
  }
}
