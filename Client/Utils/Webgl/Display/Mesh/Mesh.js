import Globals from "/utils/Webgl/Globals.js";

export default class Mesh{
    Create(vertices, indices, dimensions, data_type){
        this.vao_object = Globals.gl.createVertexArray();
        this.vbo_buffer = Globals.gl.createBuffer();
        this.ebo_buffer = Globals.gl.createBuffer();
    }

    Draw(){
        Globals.gl.BindVertexArray(this.vao_object);
    }
    CleanUp(){
        Globals.gl.deleteVertexArray(this.vao_object);
        Globals.gl.deleteBuffer(this.vbo_buffer);
        Globals.gl.deleteBuffer(this.ebo_buffer);
    }
}