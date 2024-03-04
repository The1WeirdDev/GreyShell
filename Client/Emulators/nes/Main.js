import Nes from "/emulators/nes/Scripts/Nes.js";

var nes = new Nes();
var interval = null;

async function get(rom_url) {
  const response = await fetch(rom_url);
  const buffer = await response.arrayBuffer();

  const bytes = new Uint8Array(buffer);
  nes.Reset();
  nes.LoadRom(bytes);
  interval = setInterval(Update, 1000 / 60);
}
function Init() {
  get("/emulators/roms/nes/SuperMarioBros(E).nes");

  document.addEventListener("keydown", (e) => {
    if (e.keyCode == 32) nes.Clock();
  });
}

function Update() {
  nes.Clock();
}

Init();
