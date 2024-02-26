import Display from "/utils/Webgl/Display/Display.js";
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js";
import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import Globals from "/utils/Webgl/Globals.js";
import Shader from "/utils/Webgl/Display/Shader.js";
import Texture from "/utils/Webgl/Display/Texture.js";

import UI from "/utils/Webgl/Display/UI/UI.js";
import UIRenderer from "/utils/Webgl/Display/UI/UIRenderer.js";
import { SizeConstraint } from "/utils/Webgl/Display/UI/UI.js";
import Frame from "/utils/Webgl/Display/UI/Frame.js";
import TexturedFrame from "/utils/Webgl/Display/UI/TexturedFrame.js";

import Entity from "/games/1v1shooter/Scripts/Entities/Entity.js";

import Time from "/utils/Utils/Time.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js";
import Keyboard from "/utils/Utils/Input/Keyboard.js";
import Mouse from "/utils/Utils/Input/Mouse.js";

var vertex_data = `
			precision mediump float;
			attribute vec3 position;
			attribute vec2 texture_coord;
			varying vec2 _texture_coord;

			uniform mat4 projection_matrix;
			uniform mat4 view_matrix;
			void main() {
				_texture_coord = texture_coord;
					gl_Position = projection_matrix * view_matrix * vec4(position, 1);
			}
	`;
var fragment_data = `
		precision mediump float;

		varying vec2 _texture_coord;
		uniform sampler2D textureID;
		
		void main() {
				gl_FragColor = texture2D(textureID,_texture_coord);
		}
`;

export default class Game {
  static Init() {
    Display.Init(document.getElementById("GameCanvas"));
    Game.mesh = new TexturedMesh();
    Game.mesh.Create(
      [0, 0, -5, 0, 1, -5, 1, 0, -5, 1, 1, -5],
      [0, 1, 2, 2, 1, 3],
      [0, 0, 0, 1, 1, 0, 1, 1],
      3,
    );

    Game.normal_texture = new Texture();
    Game.normal_texture.LoadTexture("/games/matching/Images/Purple.png");

    Game.shader = new Shader();
    Game.shader.CreateShaders(vertex_data, fragment_data);
    Game.shader.BindAttribute(0, "position");
    Game.projection_matrix_location =
      Game.shader.GetUniformLocation("projection_matrix");
    Game.view_matrix_location = Game.shader.GetUniformLocation("view_matrix");

    Game.proj_matrix = mat4.create();
    Game.proj_matrix = mat4.perspective(
      Game.proj_matrix,
      1.5708,
      Display.GetAspectRatio(),
      0.01,
      100.0,
    );

    Game.view_matrix = mat4.create();
    mat4.translate(Game.view_matrix, Game.view_matrix, [0, 0, -15]);
    UI.Init();

    Game.frame = new Frame(-0.5, 0, 0.25, 0.25);
    Game.frame.SetSizeConstraint(SizeConstraint.ReverseAspectX);
    Game.frame.AddnMouseButtonClickEvent(0, ()=>{console.log("Hello")});

    Game.entity = new Entity();
    Keyboard.Init();
    Mouse.Init();
    Game.AddEventListeners();
    Time.Init();
  }

  static AddEventListeners(){
    document.addEventListener("mouseover", (event) => {
      Keyboard.OnMouseEnter();
    });
  
    document.addEventListener("mouseleave", (event) => {
      Keyboard.OnFocusLost();
    });

    document.addEventListener("keydown", (event)=>{
      Keyboard.OnKeyPress(event);
    })
    
    document.addEventListener("keyup", (event)=>{
      Keyboard.OnKeyRelease(event);
    });

    document.addEventListener("focusout", ()=>{
      Keyboard.OnFocusLost();
    });

    document.addEventListener("mousedown", (e)=>{
      Mouse.OnMouseClick(e);
    });
    
    document.addEventListener("mouseup", (e)=>{
      Mouse.OnMouseRelease(e);
    });

    document.querySelector("canvas").addEventListener("mousemove",(e)=>{Mouse.OnMouseMove(e);});
  }

  static Update() {
    Time.Update();
    Game.entity.Update();

    //Game.entity.rotation.y += Time.delta_time;
    Game.view_matrix = MatrixUtils.GenerateViewMatrix(
      Game.entity.position,
      Game.entity.rotation,
    );
    Keyboard.LateUpdate();
    Mouse.LateUpdate();
  }

  static Draw() {
    Display.Update();
    Game.shader.Start();
    Game.shader.LoadMatrix4x4(
      Game.projection_matrix_location,
      Game.proj_matrix,
    );
    Game.shader.LoadMatrix4x4(Game.view_matrix_location, Game.view_matrix);
    Globals.gl.activeTexture(Globals.gl.TEXTURE0);
    Game.normal_texture.Bind();
    Game.mesh.Draw();
    Game.shader.Stop();

    //Drawing UI
    Display.ClearDepthBuffer();
    UIRenderer.DrawFrame(Game.frame);
  }

  static CleanUp() {}
}
