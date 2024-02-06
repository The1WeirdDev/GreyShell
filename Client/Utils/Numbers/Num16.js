export default class Num16 {
  //16 Bits
  constructor(val) {
    this.Set(val);
  }

  Set(val) {
    if (val == null || val == NaN) this.value = 0;

    this.value = val & 65535;
  }

  Get() {
    return this.value;
  }

  Add(val) {
    this.value += val;
    this.value -= Math.floor(this.value / 65536) * 65536;
  }
  Sub(val) {
    this.value -= val;
    while (this.value < 0) this.value += 65536;
  }

  Inc() {
    this.value++;
    this.value -= Math.floor(this.value / 65536) * 65536;
  }
  Dec() {
    this.value--;
    while (this.value < 0) this.value += 65536;
  }
}
