import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import UIFrameShader from "/utils/Webgl/Display/Shaders/UIFrameShader.js";
import UITexturedFrameShader from "/utils/Webgl/Display/Shaders/UITexturedFrameShader.js";
import Display from "/utils/Webgl/Display/Display.js";
import Mouse from "/utils/Utils/Input/Mouse.js"
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
  static uis = [];
  static ui_amounts = 0;

  z_index = 0;
  is_hovered = false;
  is_renderable = true;
  
  mouse_click_events = [];//Each element will be an object with a button and a function

  //Null values default
  constructor(x, y, width, height){
    //Every ui will have this
    //Z index is mainly for rendering and should have affect for buttons
    this.id = UI.ui_amounts;
    this.z_index = 0;
    this.is_hovered = false;
    this.is_renderable = true;

    UI.ui_amounts++;

    if(x == null || x == NaN)x = 0;
    if(y == null || y == NaN)y = 0;
    if(width == null || width == NaN)width = 1;
    if(height == null || height == NaN)height = 1;

    this.position = [x, y];

    this.width = width;
    this.height = height;
  }

  RemoveFromUILists(){
    for(var i = 0; i < UI.uis.length; i++){
      if(UI.uis[i].id == this.id){
        UI.uis.splice(i, 1);
        break;
      }
    }
  }

  IsHovered(){
    return Mouse.normalized_position.x >= this.position[0] && Mouse.normalized_position.x < this.position[0] + this.width && Mouse.normalized_position.y >= this.position[1] && Mouse.normalized_position.y < this.position[1] + this.height; 
  }

  AddMouseButtonClickEvent(button, func){
    this.mouse_click_events.push({"button":button, "func":func});
  }

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
  static Update(){

  }

  static OnMouseButtonClick(button){
    for(var i = 0; i < UI.uis.length; i++){
      //TODO : Implement ui click events]
      var ui = UI.uis[i];
      if(ui.IsHovered() == false)continue;
      
      for(var e = 0; e < ui.mouse_click_events.length; e++){
        var event = ui.mouse_click_events[e];

        if(event.button == button)
          event.func();
      }
    }
  }
}
