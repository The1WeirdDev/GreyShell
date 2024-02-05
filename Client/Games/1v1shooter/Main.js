import Game from "/games/1v1shooter/Game.js"

function Init(){
    Game.Init();
    window.onbeforeunload = CleanUp;
    Update();
}
function Update(){
    Game.Update();
    Game.Draw();

    requestAnimationFrame(Update);
}
function CleanUp(){
    Game.CleanUp();
}

Init();