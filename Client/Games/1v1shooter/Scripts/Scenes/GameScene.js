import Scene from "/utils/Scene/Scene.js"

import UI from "/utils/Webgl/Display/UI/UI.js";
import UIRenderer from "/utils/Webgl/Display/UI/UIRenderer.js";

import TextLabel from "/utils/Webgl/Display/UI/TextLabel.js";
import SceneManager from "/utils/Scene/SceneManager.js";

import Game from "/games/1v1shooter/Scripts/Game.js"
import Entity from "/games/1v1shooter/Scripts/Entities/Entity.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js"

import ColoredObjectShader from "/utils/Webgl/Display/Shaders/ColoredObjectShader.js";
import Mesh from "/utils/Webgl/Display/Mesh/Mesh.js"

export default class GameScene extends Scene{
    constructor(){
        super("GameScene");
    }

    Init(){
        this.entity = new Entity();

        Game.colored_object_shader = new ColoredObjectShader();
        Game.colored_object_shader.Create();
        Game.colored_object_shader.Start();
        Game.colored_object_shader.LoadProjectionMatrix(Game.proj_matrix);

        var distance = 20;
        this.floor_mesh = new Mesh();
        this.floor_mesh.Create([-distance, 0, -distance, distance,0, -distance, -distance, 0, distance, distance, 0, distance], [0, 1, 2, 2,1 ,3], 3);

        Game.LoadProjectionMatrix();
        console.log("INIT");
    }
    
    CleanUp(){
        
    }

    Update(){
        this.entity.Update();

        Game.view_matrix = MatrixUtils.GenerateViewMatrix(this.entity.position,this.entity.rotation);
    }
    
    Draw(){
        Game.colored_object_shader.Start();
        Game.colored_object_shader.LoadViewMatrix(Game.view_matrix);
        Game.colored_object_shader.LoadTransformationMatrix(mat4.create());
        Game.colored_object_shader.LoadColorRGB(0, 0, 255);
        this.floor_mesh.Draw();
    }
}