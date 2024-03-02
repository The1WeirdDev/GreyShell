import Globals from "/utils/Webgl/Globals.js";
import Shader from "/utils/Webgl/Display/Shader.js";

export default class UITextLabelShader extends Shader {
  static vertex_data = `
		precision mediump float;
		attribute vec2 position;
		attribute vec2 texture_coord;
		varying vec2 _texture_coord;

		uniform vec2 frame_position;
		uniform vec2 size;

		void main() {
			_texture_coord = texture_coord;
				gl_Position = vec4(frame_position + (position * size), -1, 1);
		}
	`;
  static fragment_data = `
		precision mediump float;

		varying vec2 _texture_coord;
		uniform sampler2D textureID;

		void main() {
			vec4 color = texture2D(textureID, _texture_coord);
			if(color.x == 0.0){
				discard;
			}
			gl_FragColor = color;
		}
	`;
  constructor() {
    super();
  }

  Create() {
    this.CreateShaders(
      UITextLabelShader.vertex_data,
      UITextLabelShader.fragment_data,
    );
    this.position_location = this.GetUniformLocation("frame_position");
    this.size_location = this.GetUniformLocation("size");
  }
}
