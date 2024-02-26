import Globals from "/utils/Webgl/Globals.js";

export default class Display {
  static gl = null;

  static Init(canvas) {
    Display.canvas = canvas;
    Display.canvas.width = 1280;
    Display.canvas.height = 720;
    Globals.gl = canvas.getContext("webgl2");

    Display.OnResized(Display.canvas.width, Display.canvas.height);

    Globals.gl.enable(Globals.gl.DEPTH_TEST);

    Display.SetBackgroundColor(0, 0, 0);

    Display.canvas.oncontextmenu = (e)=>{e.preventDefault();}
    Display.canvas.onselectstart = function(){return false;}
  }

  static GetBoundingClientRect(){
    return Display.canvas.getBoundingClientRect();
  }
  static GetAspectRatio() {
    return Display.canvas.width / Display.canvas.height;
  }

  static GetAspectRatioYX() {
    return Display.canvas.height / Display.canvas.width;
  }
  static SetBackgroundColor(red, green, blue) {
    Globals.gl.clearColor(red, green, blue, 1);
  }

  static OnResized(width, height) {
    Display.width = width;
    Display.height = height;
    Globals.gl.viewport(0, 0, width, height);
  }

  static Update() {
    Globals.gl.clear(Globals.gl.COLOR_BUFFER_BIT | Globals.gl.DEPTH_BUFFER_BIT);
  }

  static ClearDepthBuffer() {
    Globals.gl.clear(Globals.gl.DEPTH_BUFFER_BIT);
  }
}
