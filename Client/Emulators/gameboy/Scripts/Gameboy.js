import CPU from "/emulators/gameboy/Scripts/CPU.js";
import { ToHex } from "/utils/Utils/Converters.js";
//https://gbdev.io/pandocs/CPU_Comparison_with_Z80.html
//https://raphaelstaebler.medium.com/memory-and-memory-mapped-i-o-of-the-gameboy-part-3-of-a-series-37025b40d89b
export default class Gameboy {
  constructor() {
    this.cpu = new CPU(this);
    this.ram = new Uint8Array(64 * 1024);
    this.video_ram = new Uint8Array(8 * 1024);
    this.can_clock = true;
  }

  Reset() {
    this.cpu.Reset();
    this.ram.fill(0, 0, this.ram.length);
    this.video_ram.fill(0, 0, this.video_ram.length);
    this.can_clock = true;
  }

  LoadRom(bytes) {
    for (var i = 0; i < bytes.length - 0x014f - 1; i++) {
      this.SetMemVal(0x100 + i, bytes[0x014f + i]);
    }
  }

  GetMemVal(addr) {
    if (addr < 0x0000 || addr >= 0xffff) return 0;
    return this.ram[addr];
  }

  SetMemVal(addr, val) {
    if (addr >= 0x0000 || addr < 0xffff) this.ram[addr] = val;
  }

  Clock() {
    if (this.can_clock == false) return;

    this.cpu.Clock();
  }
}
