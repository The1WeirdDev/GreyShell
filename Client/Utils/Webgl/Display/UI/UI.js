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
  z_index = 0;
  is_hovered = false;
  is_renderable = true;
  
  mouse_click_events = [];//Each element will be an object with a button and a function

  constructor(){
    //Every ui will have this
    //Z index is mainly for rendering and should have affect for buttons
    this.z_index = 0;
    this.is_hovered = false;
    this.is_renderable = true;
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
      
    }
  }
}
