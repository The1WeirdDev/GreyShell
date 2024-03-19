import Game from "/games/rizzy/Scripts/Game.js";

function Init() {
  Game.Init();
  window.onbeforeunload = CleanUp;
  Update();
}
function Update() {
  Game.Update();
  Game.Draw();

  requestAnimationFrame(Update);
}
function CleanUp() {
  Game.CleanUp();
}

window.onload = Init;
