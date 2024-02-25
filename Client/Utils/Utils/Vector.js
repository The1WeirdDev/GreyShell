export class Vector2 {
  constructor(x, y) {
    if (x == 0 || y == 0) {
      x = 0;
      y = 0;
    }

    this.x = x;
    this.y = y;
  }
}

export class Vector3 {
  constructor(x, y, z) {
    if (
      x == NaN ||
      y == NaN ||
      z == NaN ||
      x == null ||
      y == null ||
      z == null
    ) {
      x = 0;
      y = 0;
      z = 0;
    }

    this.x = x;
    this.y = y;
    this.z = z;
  }
}
