import Gameboy from "/emulators/gameboy/Scripts/Gameboy.js";

var gameboy = new Gameboy();
var interval = null;

async function get(rom_url) {
  const response = await fetch(rom_url);
  const buffer = await response.arrayBuffer();
  var view1 = new DataView(buffer);

  const bytes = new Uint8Array(buffer);
  gameboy.Reset();
  gameboy.LoadRom(bytes);
  interval = setInterval(Update, 1000 / 60);
}
function Init() {
  get("/emulators/roms/gameboy/Tetris.gb");
}

function Update() {
  gameboy.Clock();
}

Init();
