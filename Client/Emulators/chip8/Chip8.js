import Num8 from "/utils/Numbers/Num8.js";
import Num16 from "/utils/Numbers/Num16.js";

export default class Chip8 {
  constructor() {
    this.pc = new Num16();
  }

  LoadRom() {
    this.Reset();
  }

  Reset() {}
}
