import Scene from "/utils/Scene/Scene.js";

import UI from "/utils/Webgl/UI/UI.js";
import TextLabel from "/utils/Webgl/UI/TextLabel.js";
import UIRenderer from "/utils/Webgl/UI/UIRenderer.js";
import Frame from "/utils/Webgl/UI/Frame.js"
import Image from "/utils/Webgl/UI/Image.js"

import SceneManager from "/utils/Scene/SceneManager.js";

import Game from "/games/rizzy/Scripts/Game.js";
import OBJParser from "/utils/Parsers/OBJParser.js"
import Physics from "/utils/Physics/Physics.js"
import Display from "/utils/Webgl/Display/Display.js"
import Entity from "/games/rizzy/Scripts/Entities/Entity.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js";
import Time from "/utils/Utils/Time.js"
import ShapeCreator from "/utils/Webgl/Display/Mesh/ShapeCreator.js"
import { Vector3 } from "/utils/Utils/Vector.js";

import ColoredObjectShader from "/utils/Webgl/Display/Shaders/ColoredObjectShader.js";
import ColoredPhongObjectShader from "/utils/Webgl/Display/Shaders/ColoredPhongObjectShader.js";

import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js";
import NormalMesh from "/utils/Webgl/Display/Mesh/NormalMesh.js";

import PointLight from "/utils/Webgl/Lighting/PointLight.js"
import SpotLight from "/utils/Webgl/Lighting/SpotLight.js"

import NormalMeshObject from "/utils/Webgl/Objects/NormalMeshObject.js"
import ObjectRenderer from "/utils/Webgl/Objects/ObjectRenderer.js"

export default class GameScene extends Scene {
	constructor() {
		super("GameScene");
	}

	Init() {
		this.entity = new Entity();

		this.colored_phong_object_shader = new ColoredPhongObjectShader();
		this.colored_phong_object_shader.Create();
		this.colored_phong_object_shader.Start();
		this.colored_phong_object_shader.LoadProjectionMatrix(Game.proj_matrix);

		this.points_lights = [];
		this.spot_lights = [];

		this.flash_light = new SpotLight();
		this.spot_lights.push(this.flash_light);

		this.floor_object = new NormalMeshObject();
		this.floor_object.transform.SetScaleXYZ(10,0.1,10);
		this.floor_object.transform.CalculateTransformationMatrix();
		ShapeCreator.CreateCubeNormalMesh(this.floor_object.mesh);


		this.wall_object = new NormalMeshObject();
		OBJParser.ReadURLAsOBJMeshData("/games/rizzy/Res/Meshes/Walls.obj",(mesh_data)=>{
				this.wall_object.CreateMesh(mesh_data.vertices, mesh_data.indices, mesh_data.normals, 3);
		})

		Physics.Init();
		console.log("INIT");
	}

	CleanUp() {}

	Update() {
		Physics.Update();
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
		Game.view_matrix = this.entity.transform.matrix;

		var rot = Vector3.Clone(this.entity.transform.rotation);
		rot.x = Math.cos(this.entity.transform.rotation.z) * Math.sin(this.entity.transform.rotation.y);
		rot.y = -Math.sin(this.entity.transform.rotation.z);
		rot.z = -Math.cos(this.entity.transform.rotation.z) * Math.cos(this.entity.transform.rotation.y);
		this.flash_light.SetDirection(rot);
		this.flash_light.SetPosition(this.entity.transform.position);
	}

	LoadLights(){
		for(var i = 0; i < this.points_lights.length; i++){
			this.points_lights[i].LoadValuesToShader(this.colored_phong_object_shader, i);
		}
		for(var i = this.points_lights.length; i < this.colored_phong_object_shader.max_num_of_points_lights; i++){
			this.colored_phong_object_shader.LoadFloat(this.colored_phong_object_shader.points_lights[i].constant_loc, 0);
		}

		for(var i = 0; i < this.spot_lights.length; i++){
			this.spot_lights[i].LoadValuesToShader(this.colored_phong_object_shader, i);
		}
		for(var i = this.spot_lights.length; i < this.colored_phong_object_shader.max_num_of_spot_lights; i++){
			this.colored_phong_object_shader.LoadFloat(this.colored_phong_object_shader.spot_lights[i].constant_loc, 0);
		}
	}
	Draw() {
		this.colored_phong_object_shader.Start();
		this.LoadLights();
		this.colored_phong_object_shader.LoadViewMatrix(Game.view_matrix);
		this.colored_phong_object_shader.LoadTransformationMatrix(mat4.create());
		this.colored_phong_object_shader.LoadColorRGB(255, 255, 255);


	//	this.floor_mesh.Draw();
		//this.cube_mesh.Draw();
		ObjectRenderer.DrawNormalMeshObject(this.colored_phong_object_shader, this.floor_object);
		ObjectRenderer.DrawNormalMeshObject(this.colored_phong_object_shader, this.wall_object);
	}

	LateDraw(){
	}
}
