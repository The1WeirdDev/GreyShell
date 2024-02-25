import Display from "/utils/Webgl/Display/Display.js";
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js";
import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import Globals from "/utils/Webgl/Globals.js";
import Shader from "/utils/Webgl/Display/Shader.js";
import Texture from "/utils/Webgl/Display/Texture.js";

import UI from "/utils/Webgl/Display/UI/UI.js";
import { SizeConstraint } from "/utils/Webgl/Display/UI/UI.js";
import Frame from "/utils/Webgl/Display/UI/Frame.js";
import TexturedFrame from "/utils/Webgl/Display/UI/TexturedFrame.js";

import Entity from "/games/1v1shooter/Scripts/Entities/Entity.js";

import Time from "/utils/Utils/Time.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js";

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

    Game.frame = new TexturedFrame(-0.5, 0, 1, 1, Game.normal_texture);
    Game.frame.SetSizeConstraint(SizeConstraint.ReverseAspectX);

    Game.entity = new Entity();
    Time.Init();
  }

  static Update() {
    Time.Update();
    Game.entity.position.z += Time.delta_time;
    Game.entity.rotation.y += Time.delta_time;
    Game.view_matrix = MatrixUtils.GenerateViewMatrix(
      Game.entity.position,
      Game.entity.rotation,
    );
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
    // UI.DrawTexturedFrame(Game.frame);
  }

  static CleanUp() {}
}
