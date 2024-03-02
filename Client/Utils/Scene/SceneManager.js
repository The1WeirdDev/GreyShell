import Scene from "/utils/Scene/Scene.js"

export default class SceneManager{
    static scenes = [];
    static current_id = 0;

    static Init(){
        for(var i = 0; i < SceneManager.scenes.length; i++)
            SceneManager.scenes[i].Init();
    }

    static CleanUp(){
        for(var i = 0; i < SceneManager.scenes.length; i++)
            SceneManager.scenes[i].CleanUp();
    }

    static Update(){
        for(var i = 0; i < SceneManager.scenes.length; i++)
            SceneManager.scenes[i].Update();
    }

    static Draw(){
        for(var i = 0; i < SceneManager.scenes.length; i++)
            SceneManager.scenes[i].Draw();
    }
    
    static LateDraw(){
        for(var i = 0; i < SceneManager.scenes.length; i++)
            SceneManager.scenes[i].LateDraw();
    }

    static AddScene(scene){
        scene.id = SceneManager.current_id;
        SceneManager.current_id++;
        SceneManager.scenes.push(scene);
    }

    static RemoveScene(scene){
        for(var i = 0; i < SceneManager.scenes.length; i++){
            if(SceneManager.scenes[i] == scene){
                SceneManager.scenes[i].CleanUp();
                SceneManager.scenes.splice(i);
                return;
            }
        }
    }
    static RemoveSceneFromIndex(index){
        if(index >= 0 && index < SceneManager.scenes.length){
            SceneManager.scenes[i].CleanUp();
            SceneManager.scenes.splice(i);
        }
    }

    static RemoveSceneFromName(name){
        for(var i = 0; i < SceneManager.scenes.length; i++){
            if(SceneManager.scenes[i].name == name){
                SceneManager.scenes[i].CleanUp();
                SceneManager.scenes.splice(i);
                return;
            }
        }
    }

    static GetSceneFromName(name){
        for(var i = 0; i < SceneManager.scenes.length; i++)
            if(SceneManager.scenes[i].name == name)return SceneManager.scenes[i];

        return null;
    }
}