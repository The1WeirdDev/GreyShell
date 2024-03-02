import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import UIFrameShader from "/utils/Webgl/Display/Shaders/UIFrameShader.js";
import UITexturedFrameShader from "/utils/Webgl/Display/Shaders/UITexturedFrameShader.js";
import UITextLabelShader from "/utils/Webgl/Display/Shaders/UITextLabelShader.js";
import Display from "/utils/Webgl/Display/Display.js";
import Mouse from "/utils/Utils/Input/Mouse.js";
import UIRenderer from "/utils/Webgl/Display/UI/UIRenderer.js";
//Default x y width height will be relative to screen
//Coordinate space is -0.5, 0.5 for x y

export const WrapMode = {
  None: 0,
  WrapAround: 1,
};
export const SizeConstraint = {
  None: 0,
  AspectX: 1, //X Gets multiplier by aspect ratio
  AspectY: 2, //Y Gets multiplier by aspect ratio
  ReverseAspectX: 3, //X Gets multiplier by aspect ratio
  ReverseAspectY: 4, //Y Gets multiplier by aspect ratio
};

export default class UI {
  static uis = [];
  static ui_amounts = 0;

  z_index = 0;
  is_hovered = false;
  is_renderable = true;
  children = [];

  mouse_click_events = []; //Each element will be an object with a button and a function

  //Null values default
  constructor(x, y, width, height, size_constraint) {
    //Every ui will have this
    //Z index is mainly for rendering and should have affect for buttons
    this.id = UI.ui_amounts;
    this.z_index = 0;
    this.is_hovered = false;
    this.is_renderable = true;

    this.clip_descendents = false;

    UI.ui_amounts++;

    if (x == null || x == NaN) x = 0;
    if (y == null || y == NaN) y = 0;
    if (width == null || width == NaN) width = 1;
    if (height == null || height == NaN) height = 1;
    if (size_constraint == null) size_constraint = SizeConstraint.None;

    this.constraint = size_constraint;

    this.position = [x, y];
    this.mouse_click_events = [];

    this.width = width;
    this.height = height;
    this.opacity = 1; //0-1

    this.background_color = [1, 1, 1];
  }

  SetSizeConstraint(size_constraint) {
    this.constraint = size_constraint;
  }

  SetBackgroundColorRGB(red, green, blue) {
    this.background_color = [red / 255, green / 255, blue / 255];
  }

  RemoveFromUILists(do_not_remove_children) {
    for (var i = 0; i < UI.uis.length; i++) {
      if (UI.uis[i].id == this.id) {
        if (do_not_remove_children != true) {
          for (var c = 0; c < UI.uis[i].children.length; c++) {
            UI.uis[i].children[c].RemoveFromUILists();
          }
        }
        UI.uis.splice(i, 1);
        break;
      }
    }
  }

  IsHovered() {
    var real_size = UIRenderer.GetSizeWithConstraint(
      this.width,
      this.height,
      this.constraint,
    );
    return (
      Mouse.normalized_position.x >= this.position[0] &&
      Mouse.normalized_position.x < this.position[0] + real_size[0] &&
      Mouse.normalized_position.y >= this.position[1] &&
      Mouse.normalized_position.y < this.position[1] + real_size[1]
    );
  }

  AddMouseButtonClickEvent(button, func) {
    if (typeof button !== "number") {
      console.error(
        "UI Adding Mouse Button Click Event argument 1 requires number. Instead got, ",
        button,
      );
    }
    this.mouse_click_events.push({ button: button, func: func });
  }

  static Init() {
    UI.textured_mesh = new TexturedMesh();
    UI.textured_mesh.Create(
      [0, 0, 0, 1, 1, 0, 1, 1],
      [0, 1, 2, 2, 1, 3],
      //[1, 1, 1, 0, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 1, 0],
      2,
    );

    UI.frame_shader = new UIFrameShader();
    UI.frame_shader.Create();

    UI.textured_frame_shader = new UITexturedFrameShader();
    UI.textured_frame_shader.Create();

    UI.text_label_shader = new UITextLabelShader();
    UI.text_label_shader.Create();
  }
  static Update() {}

  static OnMouseButtonClick(button) {
    for (var i = 0; i < UI.uis.length; i++) {
      //TODO : Implement ui click events]
      var ui = UI.uis[i];
      if (ui.IsHovered() == false) continue;

      for (var e = 0; e < ui.mouse_click_events.length; e++) {
        var event = ui.mouse_click_events[e];

        if (event.button == button) event.func();
      }
    }
  }
}
