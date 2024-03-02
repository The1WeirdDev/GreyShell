import Scene from "/utils/Scene/Scene.js"

import UI from "/utils/Webgl/Display/UI/UI.js";
import UIRenderer from "/utils/Webgl/Display/UI/UIRenderer.js";

import TextLabel from "/utils/Webgl/Display/UI/TextLabel.js";
import SceneManager from "/utils/Scene/SceneManager.js";

import Game from "/games/1v1shooter/Scripts/Game.js"
import Entity from "/games/1v1shooter/Scripts/Entities/Entity.js";
import MatrixUtils from "/utils/Utils/MatrixUtils.js"
export default class GameScene extends Scene{
    constructor(){
        super("GameScene");
    }

    Init(){
        this.entity = new Entity();

        Game.LoadProjectionMatrix();
        console.log("INIT");
    }
    
    CleanUp(){
        
    }

    Update(){
        this.entity.Update();

        Game.view_matrix = MatrixUtils.GenerateViewMatrix(this.entity.position,this.entity.rotation);
    }
    
    LateDraw(){
    }
}