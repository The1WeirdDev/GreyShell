import Chip8 from "/emulators/chip8/Chip8.js";

var chip8 = new Chip8();
var interval = null;

function Init() {
	fetch("/emulators/roms/chip8/pong.rom").then(response => response)
		.then(json => {
			data = [...json]
		})
}

function Update() {
  chip8.Clock();
}

Init();
