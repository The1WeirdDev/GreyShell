import Globals from "/utils/Webgl/Globals.js";

export default class Display {
  static gl = null;

  static Init(canvas) {
    Display.canvas = canvas;
    Display.canvas.width = 1200;
    Display.canvas.height = Display.canvas.width * (9 / 16);
    Globals.gl = canvas.getContext("webgl2", {
      premultipliedAlpha: false, // Ask for non-premultiplied alpha
      alpha: true,
    });

    Display.OnResized(Display.canvas.width, Display.canvas.height);

    Globals.gl.enable(Globals.gl.DEPTH_TEST);

    Display.SetBackgroundColor(0, 0, 0);

    Display.canvas.oncontextmenu = (e) => {
      e.preventDefault();
    };
    Display.canvas.onselectstart = function () {
      return false;
    };
  }

  static GetBoundingClientRect() {
    return Display.canvas.getBoundingClientRect();
  }
  static GetAspectRatio() {
    return Display.canvas.width / Display.canvas.height;
  }

  static GetAspectRatioYX() {
    return Display.canvas.height / Display.canvas.width;
  }

  static SetAbsolutePosition(x, y){
    Display.canvas.style.position = "fixed";
    Display.canvas.left = "0px";
    Display.canvas.top = "0px";;
  }
  static SetBackgroundColor(red, green, blue) {
    Globals.gl.clearColor(red, green, blue, 1);
  }

  static EnableAlpha() {
    Globals.gl.enable(Globals.gl.BLEND);
    Globals.gl.blendFunc(Globals.gl.SRC_ALPHA, Globals.gl.ONE_MINUS_SRC_ALPHA);
  }

  //Can also be used to resize manually
  static OnResized(width, height) {
    Display.width = width;
    Display.height = height;
    Display.canvas.width = width;
    Display.canvas.height = height;
    Globals.gl.viewport(0, 0, width, height);
  }

  static Update() {
    Globals.gl.clear(Globals.gl.COLOR_BUFFER_BIT | Globals.gl.DEPTH_BUFFER_BIT);
  }

  static ClearDepthBuffer() {
    Globals.gl.clear(Globals.gl.DEPTH_BUFFER_BIT);
  }

  static ToggleFullscreen(){
    Display.canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  }
}
