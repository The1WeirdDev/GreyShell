import Globals from "/utils/Webgl/Globals.js";

export default class Shader {
  program_id = null;
  vertex_shader_id = null;
  fragment_shader_id = null;

  CreateShaders(vertex_data, fragment_data) {
    this.vertex_shader_id = this.CreateShader(
      Globals.gl.VERTEX_SHADER,
      vertex_data,
    );
    this.fragment_shader_id = this.CreateShader(
      Globals.gl.FRAGMENT_SHADER,
      fragment_data,
    );
    this.program_id = Globals.gl.createProgram();

    Globals.gl.attachShader(this.program_id, this.vertex_shader_id);
    Globals.gl.attachShader(this.program_id, this.fragment_shader_id);

    Globals.gl.linkProgram(this.program_id);
    Globals.gl.validateProgram(this.program_id);

    Globals.gl.detachShader(this.program_id, this.vertex_shader_id);
    Globals.gl.detachShader(this.program_id, this.fragment_shader_id);
  }

  CreateShader(type, data) {
    var shader = Globals.gl.createShader(type);

    Globals.gl.shaderSource(shader, data);
    Globals.gl.compileShader(shader);

    var message = Globals.gl.getShaderInfoLog(shader);
    if (message.length > 0) {
      throw new Error(
        `Could not compile ${
          type == Globals.gl.VERTEX_SHADER ? "vertex" : "fragment"
        } shader because of ${message}`,
      );
    }
    return shader;
  }

  Start() {
    Globals.gl.useProgram(this.program_id);
  }

  Stop() {
    Globals.gl.useProgram(null);
  }

  BindAttribute(attribute, name) {
    Globals.gl.bindAttribLocation(this.program_id, attribute, name);
  }

  GetUniformLocation(name) {
    return Globals.gl.getUniformLocation(this.program_id, name);
  }

  LoadFloat(location, value) {
    Globals.gl.uniform1f(location, value);
  }
  LoadMatrix4x4(location, value) {
    Globals.gl.uniformMatrix4fv(location, false, value);
  }

  LoadVector2(location, v1, v2){
    Globals.gl.uniform2f(location, v1, v2);
  }
  
  LoadVector3(location, v1, v2, v3){
    Globals.gl.uniform3f(location, v1, v2, v3);
  }

  LoadVector2Array(location, value) {
    Globals.gl.uniform2f(location, value[0], value[1]);
  }
  LoadVector3Array(location, value) {
    Globals.gl.uniform3f(location, value[0], value[1], value[2]);
  }
}
