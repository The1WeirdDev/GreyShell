import Num8 from "/utils/Numbers/Num8.js";
import Num16 from "/utils/Numbers/Num16.js";

const font = [
  0xf0,
  0x90,
  0x90,
  0x90,
  0xf0, // 0
  0x20,
  0x60,
  0x20,
  0x20,
  0x70, // 1
  0xf0,
  0x10,
  0xf0,
  0x80,
  0xf0, // 2
  0xf0,
  0x10,
  0xf0,
  0x10,
  0xf0, // 3
  0x90,
  0x90,
  0xf0,
  0x10,
  0x10, // 4
  0xf0,
  0x80,
  0xf0,
  0x10,
  0xf0, // 5
  0xf0,
  0x80,
  0xf0,
  0x90,
  0xf0, // 6
  0xf0,
  0x10,
  0x20,
  0x40,
  0x40, // 7
  0xf0,
  0x90,
  0xf0,
  0x90,
  0xf0, // 8
  0xf0,
  0x90,
  0xf0,
  0x10,
  0xf0, // 9
  0xf0,
  0x90,
  0xf0,
  0x90,
  0x90, // A
  0xe0,
  0x90,
  0xe0,
  0x90,
  0xe0, // B
  0xf0,
  0x80,
  0x80,
  0x80,
  0xf0, // C
  0xe0,
  0x90,
  0x90,
  0x90,
  0xe0, // D
  0xf0,
  0x80,
  0xf0,
  0x80,
  0xf0, // E
  0xf0,
  0x80,
  0xf0,
  0x80,
  0x80,
]; // F

function ToHex(num, digits, no_prefix) {
  var prefix = "0x";
  if (no_prefix) prefix = "";
  return (
    prefix + parseInt(num, 10).toString(16).padStart(digits, "0").toUpperCase()
  );
}

export default class Chip8 {
  constructor() {
    this.pc = new Num16(0x200);
    this.i = new Num16(0);
    this.registers = new Uint8Array(16);
    this.stack = [];
    this.ram = new Uint8Array(1024 * 4);

    this.canvas = document.getElementById("EmuCanvas");
    this.context = this.canvas.getContext("2d");
    this.screen_buffer = new Array(64 * 32);

    this.pixel_size = 10;
    this.canvas.width = 64 * this.pixel_size;
    this.canvas.height = 32 * this.pixel_size;
    this.DrawScreen();
  }

  LoadRom(bytes) {
    this.Reset();

    for (var i = 0; i < bytes.length; i++) {
      this.SetMemVal(i + 0x200, bytes[i]);
    }

    this.can_clock = true;
  }

  Reset() {
    this.pc.Set(0x200);
    this.i.Set(0);
    this.registers.fill(0, 0, this.registers.length);
    this.ram.fill(0, 0, this.ram.length);
    this.stack = [];
    this.screen_buffer.fill(0, 0, this.screen_buffer.length);
    this.opcode = 0x0000;

    //Load Font
    for (var i = 0; i < font.length; i++) {
      this.SetMemVal(i + 0x50, font[i]);
    }
  }

  Clock() {
    if (!this.can_clock) return;
    this.opcode =
      (this.GetMemVal(this.pc.Get()) << 8) | this.GetMemVal(this.pc.Get() + 1);
    console.log(ToHex(this.pc.Get(), 4) + ": " + ToHex(this.opcode, 4));
    //Execute opcode
    switch (this.opcode & 0xf000) {
      case 0x0000:
        switch (this.opcode & 0xff) {
          case 0xe0:
            this.screen_buffer.fill(0, 0, this.screen_buffer.length);
            break;
          case 0xee:
            this.pc.Set(this.stack.pop() + 2);
            break;
          default:
            this.OnIllegalOpcode();
            break;
        }
        break;
      case 0x1000:
        this.pc.Set(this.opcode & 0xfff);
        break;
      case 0x2000:
        this.stack.push(this.pc.Get());
        this.pc.Set(this.opcode & 0xfff);
        break;
      case 0x3000:
        if (this.registers[(this.opcode >> 8) & 0xf] == (this.opcode & 0xff))
          this.pc.Add(2);
        this.pc.Add(2);
        break;
      case 0x4000:
        if (this.registers[(this.opcode >> 8) & 0xf] != (this.opcode & 0xff))
          this.pc.Add(2);
        this.pc.Add(2);
        break;
      case 0x5000:
        if (
          this.registers[(this.opcode >> 8) & 0xf] ==
          this.registers[(this.opcode >> 4) & 0xf]
        )
          this.pc.Add(2);
        this.pc.Add(2);
        break;
      case 0x6000:
        this.registers[(this.opcode >> 8) & 0xf] = this.opcode & 0xff;
        this.pc.Add(2);
        break;
      case 0x7000:
        this.registers[(this.opcode >> 8) & 0xf] += this.opcode & 0xff;
        this.pc.Add(2);
        break;
      case 0x8000:
        switch (this.opcode & 0xf) {
          case 0x0:
            this.registers[(this.opcode >> 8) & 0xf] =
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
            break;
          case 0x1:
            this.registers[(this.opcode >> 8) & 0xf] =
              this.registers[(this.opcode >> 8) & 0xf] |
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
            break;
          case 0x2:
            this.registers[(this.opcode >> 8) & 0xf] =
              this.registers[(this.opcode >> 8) & 0xf] &
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
            break;
          case 0x3:
            this.registers[(this.opcode >> 8) & 0xf] =
              this.registers[(this.opcode >> 8) & 0xf] ^
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
            break;
          case 0x4:
            this.registers[0xf] =
              this.registers[(this.opcode >> 8) & 0xf] +
                this.registers[(this.opcode >> 4) & 0xf] <
              this.registers[(this.opcode >> 8) & 0xf]
                ? 1
                : 0;

            this.registers[(this.opcode >> 8) & 0xf] =
              this.registers[(this.opcode >> 8) & 0xf] +
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
            break;
          case 0x5:
            this.registers[0xf] =
              this.registers[(this.opcode >> 8) & 0xf] -
                this.registers[(this.opcode >> 4) & 0xf] >
              this.registers[(this.opcode >> 8) & 0xf]
                ? 1
                : 0;

            this.registers[(this.opcode >> 8) & 0xf] =
              this.registers[(this.opcode >> 8) & 0xf] -
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
            break;
          case 0x6:
            this.registers[0xf] = this.registers[(this.opcode >> 8) & 0xf] & 1;
            this.registers[(this.opcode >> 8) & 0xf] /= 2;
            this.pc.Add(2);
            /*
            this.registers[0xf] = this.registers[(this.opcode >> 8) & 0xf] >> 7;
            this.registers[(this.opcode >> 8) & 0xf] >>=
              this.registers[(this.opcode >> 4) & 0xf];
            this.pc.Add(2);
						*/
            break;
          case 0xe:
            this.registers[0xf] = this.registers[(this.opcode >> 8) & 0xf] >> 7;
            this.registers[(this.opcode >> 8) & 0xf] *= 2;
            this.pc.Add(2);
            break;
          default:
            this.OnIllegalOpcode();
        }
        break;
      case 0x9000:
        if (
          this.registers[(this.opcode >> 8) & 0xf] !=
          this.registers[(this.opcode >> 4) & 0xf]
        )
          this.pc.Add(2);
        this.pc.Add(2);
        break;
      case 0xa000:
        this.i.Set(this.opcode & 0x0fff);
        this.pc.Add(2);
        break;
      case 0xd000:
        var global_x = this.registers[(this.opcode & 0x0f00) >> 8] % 64;
        var global_y = this.registers[(this.opcode & 0x00f0) >> 4] % 32;
        var height = this.opcode & 0xf;

        for (var y = 0; y < height; y++) {
          var sprite = this.GetMemVal(this.i.Get() + y);
          if (y + global_y >= 32 || y + global_y < 0) continue;

          for (var x = 0; x < 8; x++) {
            if ((sprite & (0x80 >> x)) != 0) {
              if (x + global_x >= 64 || x + global_x < 0) continue;
              this.SetPixel(
                x + global_x,
                y + global_y,
                this.GetPixel(x + global_x, y + global_y) ^ 1,
              );
            }
          }
        }

        this.pc.Add(2);
        break;
      case 0xf000:
        switch (this.opcode & 0xff) {
          case 0x29:
            this.i.Set(0x50 + i * 4);
            this.pc.Add(2);
            break;
          case 0x33:
            var val = this.registers[(this.opcode >> 8) & 0xf];
            this.SetMemVal(this.i.Get() + 0, Math.floor(val / 100));
            this.SetMemVal(this.i.Get() + 1, Math.floor(val / 10) % 10);
            this.SetMemVal(this.i.Get() + 2, val % 10);
            this.pc.Add(2);
            break;
          case 0x55:
            var register = (this.opcode >> 8) & 0xf;
            for (var i = 0; i <= register; i++)
              this.SetMemVal(this.i.Get() + i, this.registers[i]);
            this.pc.Add(2);
          case 0x65:
            var register = (this.opcode >> 8) & 0xf;
            for (var i = 0; i <= register; i++)
              this.registers[i] = this.GetMemVal(this.i.Get() + i);
            this.pc.Add(2);
            break;
          default:
            this.OnIllegalOpcode();
            break;
        }
        break;
      default:
        this.OnIllegalOpcode();
    }
    this.DrawScreen();
  }

  OnIllegalOpcode() {
    this.can_clock = false;

    console.log("Illegal Opcode " + ToHex(this.opcode, 4));
  }

  GetMemVal(location) {
    if (location < 0 || location >= this.ram.length) return 0;
    return this.ram[location];
  }
  SetMemVal(location, value) {
    if (location >= 0 && location < this.ram.length) this.ram[location] = value;
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
