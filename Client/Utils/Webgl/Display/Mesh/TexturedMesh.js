import Globals from "/utils/Webgl/Globals.js";
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js"
export default class TexturedMesh extends Mesh{
  Create(vertices, indices, texture_coords, dimensions) {
    const gl = Globals.gl;

    this.vao_object = Globals.gl.createVertexArray();
    this.vbo_buffer = Globals.gl.createBuffer();
    this.tbo_buffer = Globals.gl.createBuffer();
    this.ebo_buffer = Globals.gl.createBuffer();

    Globals.gl.bindVertexArray(this.vao_object);

    //Vertices
    Globals.gl.bindBuffer(Globals.gl.ARRAY_BUFFER, this.vbo_buffer);
    Globals.gl.bufferData(
      Globals.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      Globals.gl.STATIC_DRAW,
    );

    Globals.gl.vertexAttribPointer(
      0,
      dimensions,
      Globals.gl.FLOAT,
      false,
      0,
      0,
    );

    //Texture Coords
    Globals.gl.bindBuffer(Globals.gl.ARRAY_BUFFER, this.tbo_buffer);
    Globals.gl.bufferData(
      Globals.gl.ARRAY_BUFFER,
      new Float32Array(texture_coords),
      Globals.gl.STATIC_DRAW,
    );

    Globals.gl.vertexAttribPointer(1, 2, Globals.gl.FLOAT, false, 0, 0);
    //Indices
    Globals.gl.bindBuffer(Globals.gl.ELEMENT_ARRAY_BUFFER, this.ebo_buffer);
    Globals.gl.bufferData(
      Globals.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      Globals.gl.STATIC_DRAW,
    );
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindVertexArray(null);

    this.index_count = indices.length;
  }

  //Your job to render the texture
  Draw() {
    Globals.gl.bindVertexArray(this.vao_object);
    Globals.gl.bindBuffer(Globals.gl.ARRAY_BUFFER, this.vbo_buffer);
    Globals.gl.bindBuffer(Globals.gl.ELEMENT_ARRAY_BUFFER, this.ebo_buffer);

    Globals.gl.enableVertexAttribArray(0);
    Globals.gl.enableVertexAttribArray(1);
    Globals.gl.drawElements(
      Globals.gl.TRIANGLES,
      this.index_count,
      Globals.gl.UNSIGNED_SHORT,
      0,
    );
  }
  CleanUp() {
    Globals.gl.deleteVertexArray(this.vao_object);
    Globals.gl.deleteBuffer(this.vbo_buffer);
    Globals.gl.deleteBuffer(this.ebo_buffer);
  }
}
