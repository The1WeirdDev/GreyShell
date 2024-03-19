import Display from "/utils/Webgl/Display/Display.js";
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js";
import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import Globals from "/utils/Webgl/Globals.js";
import Shader from "/utils/Webgl/Display/Shader.js";
import Texture from "/utils/Webgl/Display/Texture.js";

import UI from "/utils/Webgl/UI/UI.js";
import UIRenderer from "/utils/Webgl/UI/UIRenderer.js";
import { SizeConstraint } from "/utils/Webgl/UI/UI.js";
import Frame from "/utils/Webgl/UI/Frame.js";
import TexturedFrame from "/utils/Webgl/UI/TexturedFrame.js";
import TextLabel from "/utils/Webgl/UI/TextLabel.js";

import Entity from "/games/rizzy/Scripts/Entities/Entity.js";

import Time from "/utils/Utils/Time.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js";
import Keyboard from "/utils/Utils/Input/Keyboard.js";
import Mouse from "/utils/Utils/Input/Mouse.js";

import MainMenuScene from "/games/rizzy/Scripts/Scenes/MainMenuScene.js";
import SceneManager from "/utils/Scene/SceneManager.js";
import Scene from "/utils/Scene/Scene.js";
import OBJParser from "/utils/Parsers/OBJParser.js";

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
		Display.EnableAlpha();

		Texture.CreateTextTextures();

		Game.proj_matrix = mat4.create();
		Game.proj_matrix = mat4.perspective(
			Game.proj_matrix,
			1.5708,
			Display.GetAspectRatio(),
			0.01,
			100.0,
		);

		UI.Init();

		Keyboard.Init();
		Mouse.Init();
		Game.AddEventListeners();
		Time.Init();

		SceneManager.AddScene(new MainMenuScene());
		SceneManager.Init();

		Display.SetBackgroundColor(0, 0.8, 1);

		Globals.gl.activeTexture(Globals.gl.TEXTURE0);
	}

	static AddEventListeners() {
		document.addEventListener("mouseover", (event) => {
			Keyboard.OnMouseEnter();
		});

		document.addEventListener("mouseleave", (event) => {
			Keyboard.OnFocusLost();
		});

		document.addEventListener("keydown", (event) => {
			Keyboard.OnKeyPress(event);
		});

		document.addEventListener("keyup", (event) => {
			Keyboard.OnKeyRelease(event);
		});

		document.addEventListener("focusout", () => {
			Keyboard.OnFocusLost();
		});

		document.addEventListener("mousedown", (e) => {
			Mouse.OnMouseClick(e);
		});

		document.addEventListener("mouseup", (e) => {
			Mouse.OnMouseRelease(e);
		});

		document.querySelector("canvas").addEventListener("mousemove", (e) => {
			Mouse.OnMouseMove(e);
		});
	}

	static Update() {
		Time.Update();

		SceneManager.Update();

		Keyboard.LateUpdate();
		Mouse.LateUpdate();
	}

	static Draw() {
		Display.Update();
		SceneManager.Draw();

		//Drawing UI
		Display.ClearDepthBuffer();
		SceneManager.LateDraw();
	}

	static CleanUp() {
		SceneManager.CleanUp();
	}
}
