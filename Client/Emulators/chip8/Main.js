import Chip8 from "/emulators/chip8/Chip8.js";

var chip8 = new Chip8();
var interval = null;

async function get(rom_url) {
  const response = await fetch(rom_url);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  chip8.LoadRom(bytes);

  setInterval(Update, 1000 / 60);
}
function Init() {
  get("/emulators/roms/chip8/test_opcode.ch8");
}

function Update() {
  chip8.Clock();
}

Init();
