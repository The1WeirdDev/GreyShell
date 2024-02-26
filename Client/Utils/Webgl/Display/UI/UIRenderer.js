import UI from "/utils/Webgl/Display/UI/UI.js"
import {SizeConstraint} from "/utils/Webgl/Display/UI/UI.js"
import Display from "/utils/Webgl/Display/Display.js";

export default class UIRenderer{
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
        if(frame.is_renderable == false)
            return;
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
        var size = UIRenderer.GetSizeFromUI(frame);
        UI.frame_shader.LoadVector2Array(UI.frame_shader.size_location, size);
        UI.textured_mesh.Draw();
      }
      static DrawTexturedFrame(textured_frame) {
        if(frame.is_renderable == false)
            return;
        UI.textured_frame_shader.Start();
        //Position
        UI.textured_frame_shader.LoadVector2Array(
          UI.textured_frame_shader.position_location,
          textured_frame.position,
        );
        //Size
        var size = UIRenderer.GetSizeFromUI(textured_frame);
        UI.textured_frame_shader.LoadVector2Array(
          UI.textured_frame_shader.size_location,
          size,
        );
        UI.textured_mesh.Draw();
      }
}