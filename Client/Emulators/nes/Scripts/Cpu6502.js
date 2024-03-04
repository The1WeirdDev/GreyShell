import Num8 from "/utils/Numbers/Num8.js";
import Num16 from "/utils/Numbers/Num16.js";
import { ToHex } from "/utils/Utils/Converters.js";
import { ToBinary } from "/utils/Utils/Converters.js";

const register_header = document.getElementById("Registers");
const flag_header = document.getElementById("Flags");
const flag_bits = {
  N: 1 << 7, //Negative
  O: 1 << 6, //Overflow
  U: 1 << 5, //Unused
  B: 1 << 4, //Break
  D: 1 << 3, //Decimal Mode
  I: 1 << 2, //Interrupt Mask
  Z: 1 << 1, //Zero
  C: 1 << 0, //Carry
};

const addressing_modes = {
  Immediate: 0,
  ZeroPage: 1,
  ZeroPageX: 2,
  Absolute: 3,
  AbsoluteX: 4,
  AbsoluteY: 5,
  IndirectX: 6,
  IndirectY: 7,
};

function ToSignedInt(val) {
  return val < 128 ? val : -(256 - val);
}
export default class Cpu6502 {
  constructor(bus) {
    this.bus = bus;

    this.pc = new Num16();
    this.sp = new Num8();
    this.a = new Num8();
    this.y = new Num8();
    this.x = new Num8();
    this.flags = new Num8();

    this.cycles = 0;
  }

  Reset() {
    this.pc.Set(0x8000);
    this.sp.Set(255);
    this.a.Set(0);
    this.y.Set(0);
    this.x.Set(0);
    this.flags.Set(0);
  }

  GetMemVal(addr) {
    return this.bus.GetMemVal(addr);
  }

  SetMemVal(addr, val) {
    this.bus.SetMemVal(addr, val);
  }

  GetFlag(flag) {
    return this.flags.Get() & flag ? 1 : 0;
  }
  SetFlag(flag, enabled) {
    if (enabled != null && enabled != false) {
      this.flags.Set(this.flags.Get() | flag);
      //console.log("Setting");
    } else this.flags.Set(this.flags.Get() & ~flag);
  }

  GetMMONIC(opcode) {
    switch (opcode) {
      case 0x00:
        return "BRK";
      case 0x10:
        return "BPL";
      case 0x20:
        return "JSR";
      case 0x30:
        return "BMI";
      case 0x40:
        return "RTI";
      case 0x50:
        return "BVC";
      case 0x60:
        return "RTS";
      case 0x70:
        return "BVS";
      case 0x90:
        return "BCC";
      case 0xa0:
        return "LDY";
      case 0xb0:
        return "BCS";
      case 0xc0:
        return "CPY";
      case 0xd0:
        return "BNE";
      case 0xe0:
        return "CPX";
      case 0xf0:
        return "BEQ";
      case 0xe9:
      case 0xe5:
      case 0xf5:
      case 0xed:
      case 0xfd:
      case 0xf9:
      case 0xe1:
      case 0xf1:
        return "SBC";

      default:
        return "XXX";
    }
  }

  Clock() {
    this.opcode = this.GetMemVal(this.pc.Get());
    console.log("PC : ", ToHex(this.pc.Get(), 4), ToHex(this.opcode, 2));
    switch (this.opcode) {
      case 0x00:
        this.pc.Inc();
        break;
      case 0x10:
        this.BPL();
        break;
      case 0x18:
        this.CLC();
        break;
      case 0x2e:
        this.ROR(addressing_modes.Absolute);
        break;
      case 0x60:
        this.RTS();
        break;
      case 0x69:
        this.Add(addressing_modes.Immediate);
        break;
      case 0x78:
        this.SEI();
        break;
      case 0x88:
        this.DEY();
        break;
      case 0x8d:
        this.STA(addressing_modes.Absolute);
        break;
      case 0x9a:
        this.TXS();
        break;
      case 0x9d:
        this.STA(addressing_modes.AbsoluteX);
        break;
      case 0xa2:
        this.LDX(addressing_modes.Immediate);
        break;
      case 0xad:
        this.LDA(addressing_modes.Absolute);
        break;
      case 0xa9:
        this.LDA(addressing_modes.Immediate);
        break;
      case 0xc0:
        this.CPY(addressing_modes.Immediate);
        break;
      case 0xca:
        this.DEX();
        break;
      case 0xd8:
        this.CLD();
        break;
      case 0xf0:
        this.BEQ();
        break;
      default:
        this.IllegalOpcode();
    }
    register_header.innerText =
      ToHex(this.pc.Get(), 4) +
      " " +
      ToHex(this.a.Get(), 2) +
      " " +
      ToHex(this.x.Get(), 2) +
      " " +
      ToHex(this.y.Get(), 2);
    flag_header.innerText = ToBinary(this.flags.Get(), 8);
  }

  GetImmediate() {
    return this.GetMemVal(this.pc.Get() + 1);
  }

  GetAbsoluteAddress() {
    return (this.GetMemVal(this.pc.Get() + 2) << 8) | this.GetImmediate();
  }

  GetAbsoluteXAddress() {
    return this.GetAbsoluteAddress() + this.x.Get();
  }

  IllegalOpcode() {
    console.log("Illegal opcode ", ToHex(this.opcode, 2));
    this.bus.can_clock = false;
  }

  SEI() {
    this.SetFlag(flag_bits.I, true);
    this.pc.Inc();
  }
  CLC() {
    //Clear Carry
    this.SetFlag(flag_bits.C, false);
    this.pc.Inc();
  }
  CLD() {
    this.SetFlag(flag_bits.D, false);
    this.pc.Inc();
  }

  DEX() {
    this.x.Dec();
    this.pc.Inc();
    this.SetFlag(flag_bits.N, this.x.Get() >> 7);
    this.SetFlag(flag_bits.Z, this.x.Get() == 0);
  }
  DEY() {
    this.y.Dec();
    this.pc.Inc();
    this.SetFlag(flag_bits.N, this.y.Get() >> 7);
    this.SetFlag(flag_bits.Z, this.y.Get() == 0);
  }

  //Branches
  Branch() {
    var offset = this.GetImmediate();
    if (offset >> 7 == 1) {
      this.pc.Add(ToSignedInt(offset) + 2);
    } else {
      this.pc.Add((offset & 0x7f) + 2);
    }
  }
  BPL() {
    if (this.GetFlag(flag_bits.N) == 0) {
      this.Branch();
    } else {
      this.pc.Add(2);
    }
  }
  BEQ() {
    if (this.GetFlag(flag_bits.Z) == 1) {
      this.Branch();
    } else {
      this.pc.Add(2);
    }
  }
  BMI() {
    if (this.GetFlag(flag_bits.N) == 1) {
      this.Branch();
    } else {
      this.pc.Add(2);
    }
  }

  BNE() {
    if (this.GetFlag(flag_bits.Z) == 0) {
      this.Branch();
    } else {
      this.pc.Add(2);
    }
  }

  //Comparing
  CPY(addressing_mode) {
    switch (addressing_mode) {
      case addressing_modes.Immediate: {
        this.SetFlag(flag_bits.Z, this.a.Get() == this.y.Get());
        this.SetFlag(flag_bits.C, this.a.Get() >= this.y.Get());
        this.SetFlag(flag_bits.N, ((this.a.Get() - this.y.Get()) >> 7) & 1);
        this.pc.Inc();
        break;
      }
    }
  }

  //Bitwise
  ROR(addressing_mode) {
    switch (addressing_mode) {
      case addressing_modes.Absolute: {
        var original = this.GetMemVal(this.GetAbsoluteAddress());
        var msb = (original >> 7) & 1;
        var value = (original << 1) | (this.GetFlag(flag_bits.C) ? 1 : 0);
        this.SetFlag(flag_bits.C, msb);
        this.SetMemVal(this.GetAbsoluteAddress(), value);
        this.pc.Add(3);
        break;
      }
    }
  }

  RTS() {
    var addr =
      this.GetMemVal(0x100 + this.sp.Get() + 1) << 8 ||
      this.GetMemVal(0x100 + this.sp.Get());
    this.pc.Set(addr);
  }
  Add(addressing_mode) {
    var val = 0;
    switch (addressing_mode) {
      case addressing_modes.Immediate:
        val = this.GetImmediate();
        this.pc.Add(2);
        break;
    }
    this.a.Add(val);

    this.SetFlag(flag_bits.N, this.a.Get() >> 7);
    this.SetFlag(flag_bits.Z, this.a.Get() == 0);
    this.SetFlag(flag_bits.C, (this.a.Get() + val) >> 8);
    this.SetFlag(flag_bits.O, this.a.Get() + val > 255);
  }

  STA(addressing_mode) {
    switch (addressing_mode) {
      case addressing_modes.Absolute:
        this.SetMemVal(this.GetAbsoluteAddress(), this.a.Get());
        this.pc.Add(3);
        break;
      case addressing_modes.AbsoluteX:
        this.SetMemVal(this.GetAbsoluteXAddress(), this.a.Get());
        this.pc.Add(3);
        break;
    }
  }

  LDA(addressing_mode) {
    switch (addressing_mode) {
      case addressing_modes.Immediate:
        this.a.Set(this.GetImmediate());
        this.pc.Add(2);
        break;
      case addressing_modes.Absolute:
        this.a.Set(this.GetMemVal(this.GetAbsoluteAddress()));
        this.pc.Add(3);
        break;
    }
  }

  LDX(addressing_mode) {
    switch (addressing_mode) {
      case addressing_modes.Immediate:
        this.x.Set(this.GetImmediate());
        this.pc.Add(2);
        break;
    }
  }
  TXS() {
    this.sp.Set(this.GetImmediate());
    this.pc.Add(1);
  }
}
