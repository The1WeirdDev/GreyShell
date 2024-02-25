import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import UIFrameShader from "/utils/Webgl/Display/Shaders/UIFrameShader.js";
import UITexturedFrameShader from "/utils/Webgl/Display/Shaders/UITexturedFrameShader.js";
import Display from "/utils/Webgl/Display/Display.js";

//Default x y width height will be relative to screen
//Coordinate space is -0.5, 0.5 for x y

export const SizeConstraint = {
  None: 0,
  AspectX: 1, //X Gets multiplier by aspect ratio
  AspectY: 2, //Y Gets multiplier by aspect ratio
  ReverseAspectX: 3, //X Gets multiplier by aspect ratio
  ReverseAspectY: 4, //Y Gets multiplier by aspect ratio
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

    UI.textured_frame_shader = new UITexturedFrameShader();
    UI.textured_frame_shader.Create();
  }

  static GetSizeFromUI(ui) {
    switch (ui.constraint) {
      case SizeConstraint.AspectX:
        return [Display.GetAspectRatio() * ui.width, ui.height];
      case SizeConstraint.AspectY:
        return [ui.width, Display.GetAspectRatio() * ui.height];
      case SizeConstraint.ReverseAspectX:
        return [Display.GetAspectRatioYX() * ui.width, ui.height];
      case SizeConstraint.ReverseAspectY:
        return [ui.width, Display.GetAspectRatioYX() * ui.height];
    }
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
    var size = UI.GetSizeFromUI(frame);
    UI.frame_shader.LoadVector2Array(UI.frame_shader.size_location, size);
    UI.textured_mesh.Draw();
  }
  static DrawTexturedFrame(textured_frame) {
    UI.textured_frame_shader.Start();
    //Position
    UI.textured_frame_shader.LoadVector2Array(
      UI.textured_frame_shader.position_location,
      textured_frame.position,
    );
    //Size
    var size = UI.GetSizeFromUI(textured_frame);
    UI.textured_frame_shader.LoadVector2Array(
      UI.textured_frame_shader.size_location,
      size,
    );
    UI.textured_mesh.Draw();
  }
}
