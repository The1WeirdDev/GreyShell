import Display from "/utils/Webgl/Display/Display.js"
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js"
import Globals from "/utils/Webgl/Globals.js"

export default class Game{
    static Init(){
        Display.Init(document.getElementById("GameCanvas"));
        Game.mesh = new Mesh();
        Game.mesh.Create([0,0, 0,1, 1,0, 1,1], [0,1,2,2,1,3], 2, Globals.gl.FLOAT);
    }

    static Update(){

    }

    static Draw(){
        Display.Update();
    }

    static CleanUp(){

    }
}