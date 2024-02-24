import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import UIFrameShader from "/utils/Webgl/Display/Shaders/UIFrameShader.js";
import Display from "/utils/Webgl/Display/Display.js";

//Default x y width height will be relative to screen
//Coordinate space is -0.5, 0.5 for x y

export const SizeConstraint = {
  None: 0,
  AspectX: 1, //X Gets multiplier by aspect ratio
  AspectY: 2, //Y Gets multiplier by aspect ratio
  FlippedAspectX: 3, //X Gets multiplier by aspect ratio
  FlippedAspectY: 4, //Y Gets multiplier by aspect ratio
};
export default class UI {
  static Init() {
    UI.textured_mesh = new TexturedMesh();
    UI.textured_mesh.Create(
      [0, 0, 0, 1, 1, 0, 1, 1],
      [0, 1, 2, 2, 1, 3],
      [1, 1, 1, 0, 0, 1, 0, 0],
      2,
    );

    UI.frame_shader = new UIFrameShader();
    UI.frame_shader.Create();
  }

  static DrawFrame(frame) {
    UI.frame_shader.Start();
    //Color
    UI.frame_shader.LoadVector3Array(
      UI.frame_shader.color_location,
      frame.color,
    );
    //Position
    UI.frame_shader.LoadVector2Array(
      UI.frame_shader.position_location,
      frame.position,
    );
    //Size
    var size = [frame.width, frame.height];
    switch (frame.constraint) {
      case SizeConstraint.AspectX:
        size = [Display.GetAspectRatio() * frame.width, frame.height];
        break;
      case SizeConstraint.AspectY:
        size = [frame.width, Display.GetAspectRatio() * frame.height];
        break;
      case SizeConstraint.FlippedAspectX:
        size = [Display.GetAspectRatioYX() * frame.width, frame.height];
        break;
      case SizeConstraint.FlippedAspectY:
        size = [frame.width, Display.GetAspectRatioYX() * frame.height];
        break;
    }
    UI.frame_shader.LoadVector2Array(UI.frame_shader.size_location, size);
    UI.textured_mesh.Draw();
  }
}
