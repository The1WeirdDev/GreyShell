import Num8 from "/utils/Numbers/Num8.js";
import Num16 from "/utils/Numbers/Num16.js";

export default class Chip8 {
  constructor() {
    this.pc = new Num16(0x200);
    this.i = new Num16(0);
    this.registers = new Uint8ClampedArray(16);
    this.stack = [];
    this.ram = new Uint8ClampedArray(1024 * 4);

    this.canvas = document.getElementById("EmuCanvas");
    this.context = this.canvas.getContext("2d");
    this.screen_buffer = new Array(64 * 32);

    this.pixel_size = 10;
    this.canvas.width = 64 * this.pixel_size;
    this.canvas.height = 32 * this.pixel_size;
    this.DrawScreen();
  }

  LoadRom() {
    this.Reset();
  }

  Reset() {
    this.pc.Set(0x200);
    this.i.Set(0);
    this.registers.fill(0, 0, this.registers.length);
    this.ram.fill(0, 0, this.ram.length);
    this.stack = [];
    this.screen_buffer.fill(0, 0, this.screen_buffer.length);
    this.opcode = 0x0000;
  }
  Clock() {
		this.opcode = (this.GetMemVal(this.pc.Get()) << 8) | this.GetMemVal(this.pc.Get() + 1);
		
	}

  GetMemVal(location) {
    if (location < 0 || location >= this.ram.length) return 0;
    return this.ram[location];
  }
  SetMemVal(location, value) {
    if (location < 0 || location >= this.ram.length) this.ram[location] = value;
  }

  GetPixel(x, y) {
    return this.screen_buffer[y * 64 + x];
  }
  SetPixel(x, y, value) {
    this.screen_buffer[y * 64 + x] = value;
  }
  DrawScreen() {
    for (var x = 0; x < 64; x++) {
      for (var y = 0; y < 32; y++) {
        this.FillPixel(x, y, this.GetPixel(x, y) ? "white" : "black");
      }
    }
  }

  FillPixel(x, y, color) {
    this.FillRect(
      x * this.pixel_size,
      y * this.pixel_size,
      this.pixel_size,
      this.pixel_size,
      color,
    );
  }
  FillRect(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }
}
