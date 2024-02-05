export default class Num8 {
  //8 Bits
  constructor(val) {
    this.Set(val);
  }

  Set(val) {
    if (val == null || val == NaN) this.value = 0;

    this.value = val & 255;
  }

  Add(val) {
    this.value += val;
    this.value -= Math.floor(this.value / 256) * 256;
  }
  Sub(val) {
    this.value -= val;
    while (this.value < 0) this.value += 256;
  }

  Inc() {
    this.value++;
    this.value -= Math.floor(this.value / 256) * 256;
  }
  Dec() {
    this.value--;
    while (this.value < 0) this.value += 256;
  }
}
