import Scene from "/utils/Scene/Scene.js"

import UIRenderer from "/utils/Webgl/Display/UI/UIRenderer.js";

import TextLabel from "/utils/Webgl/Display/UI/TextLabel.js";
import SceneManager from "/utils/Scene/SceneManager.js";

import GameScene from "/games/1v1shooter/Scripts/Scenes/GameScene.js"
import Time from "/utils/Utils/Time.js"

export default class MainMenuScene extends Scene{
    constructor(){
        super("MainMenu");
    }

    Init(){
        this.label = new TextLabel(-0.25, -0.25, 0.5, 0.5, "He");
        this.label.SetBackgroundColorRGB(0,0,0);

        this.last_tick = Time.current_time;
        this.label.AddMouseButtonClickEvent(0, ()=>{
            SceneManager.RemoveScene(this);
            var scene = new GameScene();
            SceneManager.AddScene(scene);
            scene.Init();
        })
    }
    
    CleanUp(){
        this.label.CleanUp();
    }

    Update(){
        if(Time.current_time - this.last_tick > 1){
            this.last_tick = Time.current_time;
            this.label.text +="G";
        }
    }
    
    LateDraw(){
        UIRenderer.DrawTextLabel(this.label);
    }
}