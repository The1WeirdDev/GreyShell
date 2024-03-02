export default class Scene{
    constructor(name){
        this.name = name;

        //Id is controlled completely by the scene manager
        this.id = 0;
    }

    Init(){}
    CleanUp(){}
    Update(){}
    Draw(){}
    LateDraw(){}
}