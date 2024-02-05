import Globals from "/utils/Webgl/Globals.js";

export default class Display{
    static gl = null;

    static Init(canvas){
        Display.canvas = canvas;
        Display.canvas.width = 1280;
        Display.canvas.height = 720;
        Display.gl = canvas.getContext("webgl");
        Globals.gl = Display.gl;

        Display.SetBackgroundColor(0, 0, 0);
    }

    static SetBackgroundColor(red, green, blue){
        Display.gl.clearColor(red, green, blue, 1);
    }

    static Update(){
        Display.gl.clear(Display.gl.COLOR_BUFFER_BIT);
    }
}