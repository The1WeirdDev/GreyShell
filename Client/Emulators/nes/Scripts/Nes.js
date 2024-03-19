import Cpu6502 from "/emulators/nes/Scripts/Cpu6502.js";
import PPU from "/emulators/nes/Scripts/PPU.js";

import { ToHex } from "/utils/Utils/Converters.js";
//https://gbdev.io/pandocs/CPU_Comparison_with_Z80.html
//https://raphaelstaebler.medium.com/memory-and-memory-mapped-i-o-of-the-gameboy-part-3-of-a-series-37025b40d89b
export default class Nes {
  constructor() {
    this.ram = new Uint8Array(64 * 1024);
    //this.video_ram = new Uint8Array(8 * 1024

    this.cpu = new Cpu6502(this);
    this.ppu = new PPU(this);

    this.can_clock = true;
  }

  Reset() {
    this.cpu.Reset();
    this.ppu.Reset();
    this.ram.fill(0, 0, this.ram.length);
    //this.video_ram.fill(0, 0, this.video_ram.length);
    this.can_clock = true;
  }

  LoadRom(bytes) {
    var nes_header = [0x4e, 0x45, 0x53, 0x1a];
    for (var i = 0; i < 4; i++) {
      if (bytes[i] != nes_header[i]) {
        console.log("Invalid Header ", i, ToHex(bytes[i], 2));
        return;
      }
    }

    console.log("INES HEADER");

    var prg_rom_size = bytes[4] * 16384;
    var chr_rom_size = bytes[5] * 8192;
    var flags = bytes[6];
    var nametable = flags & 1;
    var has_ram = (flags >> 1) & 1;
    var alternate_nametable = (flags >> 3) & 1;
    var mapper = flags >> 4;
    console.log("Rom Size: ", bytes.length);
    console.log("PRG SIZE :", prg_rom_size);
    console.log("CHR SIZE :", chr_rom_size);
    console.log("ALTERNATE NAMETABLE: ", alternate_nametable ? "1" : "0");
    console.log(
      "NAMETABLE ARRANGEMENT: ",
      nametable ? "Horizontal" : "Vertical",
    );
    console.log("HAS RAM :", has_ram ? "True" : "False");
    console.log("MAPPER: ", mapper);

    var has_trainer = (flags >> 2) & 1;
    console.log(has_trainer ? "Does" : "Does Not", "Have Trainer");

    if (has_trainer) return;

    for (var i = 0; i < prg_rom_size; i++) {
      this.SetMemVal(0x8000 + i, bytes[16 + i]);
    }

    this.cpu.pc.Set((this.GetMemVal(0xfffd) << 8) | this.GetMemVal(0xfffc));
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

    for(var i = 0; i < 10; i++){
      this.cpu.Clock();

      this.ppu.Clock();
      this.ppu.Clock();
      this.ppu.Clock();
    }
  }
}
