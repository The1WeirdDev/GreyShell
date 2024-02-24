export default class Num16 {
  //16 Bits
  constructor(val) {
    this.value = new Uint16Array(1);
    this.Set(val);
  }

  Set(val) {
    if (val != null && val != NaN) this.value[0] = val;
  }

  Get() {
    return this.value[0];
  }

  Add(val) {
    this.value[0] += val;
  }
  Sub(val) {
    this.value[0] -= val;
  }

  Inc() {
    this.value[0]++;
  }
  Dec() {
    this.value[0]--;
  }
}
