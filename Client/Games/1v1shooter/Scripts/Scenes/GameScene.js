import Scene from "/utils/Scene/Scene.js";

import UI from "/utils/Webgl/Display/UI/UI.js";
import UIRenderer from "/utils/Webgl/Display/UI/UIRenderer.js";

import TextLabel from "/utils/Webgl/Display/UI/TextLabel.js";
import SceneManager from "/utils/Scene/SceneManager.js";

import Game from "/games/1v1shooter/Scripts/Game.js";
import Entity from "/games/1v1shooter/Scripts/Entities/Entity.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js";

import ColoredObjectShader from "/utils/Webgl/Display/Shaders/ColoredObjectShader.js";
import ColoredPhongObjectShader from "/utils/Webgl/Display/Shaders/ColoredPhongObjectShader.js";
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js";
import NormalMesh from "/utils/Webgl/Display/Mesh/NormalMesh.js";
import { Vector3 } from "/utils/Utils/Vector.js";

export default class GameScene extends Scene {
	constructor() {
		super("GameScene");
	}

	Init() {
		this.entity = new Entity();

		Game.colored_object_shader = new ColoredPhongObjectShader();
		Game.colored_object_shader.Create();
		Game.colored_object_shader.Start();
		Game.colored_object_shader.LoadProjectionMatrix(Game.proj_matrix);

		var distance = 20;
		this.floor_mesh = new NormalMesh();
		this.floor_mesh.Create(
			[
				-distance,
				0,
				-distance,
				distance,
				0,
				-distance,
				-distance,
				0,
				distance,
				distance,
				0,
				distance,
			],
			[0, 1, 2, 2, 1, 3],
			[0, 1, 0, 0, 1, 0],
			3,
		);

		Game.LoadProjectionMatrix();
		console.log("INIT");
	}

	CleanUp() {}

	Update() {
		//Check for ray intersection
		/*
		var plane_direction = new Vector3(0, 0, -1);
		var ray_direction = new Vector3(0, -1, 0);
		var ray_pos = new Vector3(0, 0, 0);
		var plane_center = new Vector3(0, 0, 5);

		plane_direction.Normalize();
		ray_direction.Normalize();
		var denom = plane_direction.Dot(ray_direction);
		var is_touching = false;
		if (Math.abs(denom) > 0.0000001) {
			var t = plane_center.Sub(ray_pos).Dot(plane_direction) / denom;
			if (t >= 0) is_touching = true; // you might want to allow an epsilon here too
		}
		*/
		this.entity.Update();

		Game.view_matrix = MatrixUtils.GenerateViewMatrix(
			this.entity.position,
			this.entity.rotation,
		);
	}

	Draw() {
		Game.colored_object_shader.Start();
		Game.colored_object_shader.LoadViewMatrix(Game.view_matrix);
		Game.colored_object_shader.LoadTransformationMatrix(mat4.create());
		Game.colored_object_shader.LoadColorRGB(255, 255, 255);
		this.floor_mesh.Draw();
	}
}
