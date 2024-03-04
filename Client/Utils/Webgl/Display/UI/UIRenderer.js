import UI from "/utils/Webgl/Display/UI/UI.js";
import { SizeConstraint } from "/utils/Webgl/Display/UI/UI.js";
import { WrapMode } from "/utils/Webgl/Display/UI/UI.js";
import Display from "/utils/Webgl/Display/Display.js";
import Texture from "/utils/Webgl/Display/Texture.js";
import { TextAlignMode } from "/utils/Webgl/Display/UI/UI.js";

export default class UIRenderer {
  static GetSizeWithConstraint(width, height, constraint) {
    switch (constraint) {
      case SizeConstraint.AspectX:
        return [Display.GetAspectRatio() * width, height];
      case SizeConstraint.AspectY:
        return [width, Display.GetAspectRatio() * height];
      case SizeConstraint.ReverseAspectX:
        return [Display.GetAspectRatioYX() * width, height];
      case SizeConstraint.ReverseAspectY:
        return [width, Display.GetAspectRatioYX() * height];
      default:
        return [width, height];
    }
  }

  static GetRatioFromConstraint(constraint) {
    switch (constraint) {
      case SizeConstraint.AspectX:
      case SizeConstraint.AspectY:
        return Display.GetAspectRatio();
      case SizeConstraint.ReverseAspectX:
      case SizeConstraint.ReverseAspectY:
        return Display.GetAspectRatioYX();
      default:
        return 1;
    }
  }
  static DrawFrame(frame) {
    if (frame.is_renderable == false) return;
    UI.frame_shader.Start();
    //Color
    UI.frame_shader.LoadVector3Array(
      UI.frame_shader.color_location,
      frame.background_color,
    );
    //Position
    UI.frame_shader.LoadVector2Array(
      UI.frame_shader.position_location,
      frame.position,
    );

    UI.frame_shader.LoadFloat(UI.frame_shader.opacity_location, frame.opacity);

    //Size
    var size = UIRenderer.GetSizeWithConstraint(
      frame.width,
      frame.height,
      frame.constraint,
    );
    UI.frame_shader.LoadVector2Array(UI.frame_shader.size_location, size);
    UI.textured_mesh.Draw();
  }
  static DrawTexturedFrame(textured_frame) {
    if (frame.is_renderable == false) return;
    UI.textured_frame_shader.Start();
    //Position
    UI.textured_frame_shader.LoadVector2Array(
      UI.textured_frame_shader.position_location,
      textured_frame.position,
    );
    //Size
    var size = UIRenderer.GetSizeWithConstraint(
      textured_frame.width,
      textured_frame.height,
      textured_frame.constraint,
    );
    UI.textured_frame_shader.LoadVector2Array(
      UI.textured_frame_shader.size_location,
      size,
    );
    UI.frame_shader.LoadFloat(UI.frame_shader.opacity_location, frame.opacity);
    UI.textured_mesh.Draw();
  }

  static MeasureTextSize(text_label){
    var x = 0;
    var y = 0;
    var font_constrained_size = UIRenderer.GetSizeWithConstraint(
      text_label.font_size,
      text_label.font_size,
      SizeConstraint.ReverseAspectX,
    );
    var display_ratio = UIRenderer.GetRatioFromConstraint(
      SizeConstraint.ReverseAspectX,
    );

    var real_container_size = UIRenderer.GetSizeWithConstraint(
      text_label.width,
      text_label.height,
      text_label.constraint,
    );
    var size = [0,0];
    for(var i = 0; i < text_label.text.length; i++){
      var char_code = text_label.text[i].charCodeAt(0);
      var texture = Texture.text_textures[char_code];
      var character_size_ratio = texture.width / texture.height;
      var character_size = character_size_ratio * text_label.font_size * display_ratio;

      if(size[0] + character_size < text_label.width){
        size[0] += character_size;
      }
      size[1] = text_label.font_size
    }

    return size;
  }
  static DrawTextLabel(text_label) {
    //Get Font Size
    var font_constrained_size = UIRenderer.GetSizeWithConstraint(
      text_label.font_size,
      text_label.font_size,
      SizeConstraint.ReverseAspectX,
    );
    var display_ratio = UIRenderer.GetRatioFromConstraint(
      SizeConstraint.ReverseAspectX,
    );

    //Get the real size in the coordinate space of the text label size
    var real_container_size = UIRenderer.GetSizeWithConstraint(
      text_label.width,
      text_label.height,
      text_label.constraint,
    );
    
    var x = 0;
    var y = 0;
    var measured_size = UIRenderer.MeasureTextSize(text_label);
    
    switch(text_label.text_align){
      case TextAlignMode.Middle:
        x=(text_label.width - measured_size[0]) / 2;
        break;
      case TextAlignMode.Center:
        x =(text_label.width - measured_size[0]) / 2;
        y = (text_label.height - measured_size[1]) / 2;
        break;
    }

    //Prepare the mesh
    UI.text_label_shader.Start();
    UI.textured_mesh.PrepareBuffers();
    for (var i = 0; i < text_label.text.length; i++) {
      //Get Character Texture
      var char_code = text_label.text[i].charCodeAt(0);
      var texture = Texture.text_textures[char_code];
      texture.Bind();

      if (x +  text_label.font_size * display_ratio > real_container_size[0]) {
        //Checks for Wrapping
        var should_break = false;
        switch (text_label.wrap_mode) {
          case WrapMode.WrapAround:
            x = 0;
            y -= text_label.font_size;
            break;
          default:
            should_break = true;
        }

        if(should_break)break;
      }

      if (y - text_label.font_size < - text_label.font_size) {
        if (text_label.clip_descendents) break;
      }
      UI.text_label_shader.LoadVector2Array(
        UI.text_label_shader.position_location,
        [x + text_label.position[0], y + text_label.position[1]],
      );
      var character_size_ratio = texture.aspect_ratio;
      x += character_size_ratio * text_label.font_size * display_ratio;
      var character_size = [
        font_constrained_size[0] * character_size_ratio,
        font_constrained_size[1],
      ];

      UI.text_label_shader.LoadVector2Array(
        UI.text_label_shader.size_location,
        character_size,
      );
      UI.textured_mesh.DrawWithoutPreperations();
    }
    //Draw Background
    UIRenderer.DrawFrame(text_label);
  }
}
