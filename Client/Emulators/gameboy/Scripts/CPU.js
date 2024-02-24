import Num16 from "/utils/Numbers/Num16.js";
import { ToHex } from "/utils/Utils/Converters.js";

const FlagBits = {
  Z: 1 << 7,
  N: 1 << 6,
  H: 1 << 5,
  C: 1 << 4,
};
export default class CPU {
  constructor(gameboy) {
    this.gameboy = gameboy;
    this.pc = new Num16(0x100);

    this.registers = new Uint8Array(8);
    /*a,b,c,d,e,f,h,l*/
  }

  GetA() {
    return this.registers[0];
  }
  GetB() {
    return this.registers[1];
  }
  GetC() {
    return this.registers[2];
  }
  GetD() {
    return this.registers[3];
  }
  GetE() {
    return this.registers[4];
  }
  GetF() {
    return this.registers[5];
  }
  GetH() {
    return this.registers[6];
  }
  GetL() {
    return this.registers[7];
  }
  SetA(val) {
    this.registers[0] = val;
  }
  SetB(val) {
    this.registers[1] = val;
  }
  SetC(val) {
    this.registers[2] = val;
  }
  SetD(val) {
    this.registers[3] = val;
  }
  SetE(val) {
    this.registers[4] = val;
  }
  SetF(val) {
    this.registers[5] = val;
  }
  SetH(val) {
    this.registers[6] = val;
  }
  SetL(val) {
    this.registers[7] = val;
  }

  GetAF() {
    this.registers[0] << 8 || this.registers[5];
  }
  GetBC() {
    this.registers[1] << 8 || this.registers[2];
  }
  GetDE() {
    this.registers[3] << 8 || this.registers[4];
  }
  GetHL() {
    this.registers[6] << 8 || this.registers[7];
  }

  SetAF(val) {
    this.SetA(val >> 8);
    this.SetF(val & 0xff);
  }
  SetBC(val) {
    this.SetB(val >> 8);
    this.SetC(val & 0xff);
  }
  SetDE(val) {
    this.SetD(val >> 8);
    this.SetE(val & 0xff);
  }
  SetHL(val) {
    this.SetH(val >> 8);
    this.SetL(val & 0xff);
  }

  SetFlag(enabled, flag) {
    if (enabled) this.SetF(this.GetF() | flag);
    else this.SetF(this.GetF() & ~flag);
  }
  Reset() {
    console.log("Reset CPU");
  }

  GetMemVal(addr) {
    return this.gameboy.GetMemVal(addr);
  }

  SetMemVal(addr, val) {
    this.gameboy.SetMemVal(addr, val);
  }
  Clock() {
    this.opcode = this.GetMemVal(this.pc.Get());
    var to_print =
      ToHex(this.pc.Get(), 4) + " Opcode: " + ToHex(this.opcode, 2);

    switch (this.opcode) {
      case 0x30:
        this.SetBC(this.GetBC() + 1);
        this.pc.Inc();
        break;
      case 0xbf:
        this.EnableInterrupts();
        this.pc.Inc();
        break;
      case 0xc3:
        this.IncA();
        this.pc.Inc();
        break;
      default:
        this.gameboy.can_clock = false;
        to_print =
          ToHex(this.pc.Get(), 4) + " Unknown opcode: " + ToHex(this.opcode, 2);
        break;
    }

    console.log(to_print);
  }

  IncA() {
    this.SetA(this.GetA() + 1);
  }

  EnableInterrupts() {
    this.SetMemVal(0xffff, 1);
  }
  DisableInterrupts() {
    this.SetMemVal(0xffff, 0);
  }
}
