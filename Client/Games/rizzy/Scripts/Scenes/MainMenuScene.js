import Scene from "/utils/Scene/Scene.js"

import UIRenderer from "/utils/Webgl/UI/UIRenderer.js";

import TextLabel from "/utils/Webgl/UI/TextLabel.js";
import SceneManager from "/utils/Scene/SceneManager.js";

import GameScene from "/games/rizzy/Scripts/Scenes/GameScene.js"
import Time from "/utils/Utils/Time.js"

import { TextAlignMode } from "/utils/Webgl/UI/UI.js";

export default class MainMenuScene extends Scene{
    constructor(){
        super("MainMenu");
    }

    Init(){
        this.label = new TextLabel(-0.25, -0.25, 0.5, 0.5, "Play Game");
        this.label.SetBackgroundColorRGB(0,0,0);
        this.label.SetTextAlignMode(TextAlignMode.Center);

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
    }

    LateDraw(){
        UIRenderer.DrawTextLabel(this.label);
    }
}
