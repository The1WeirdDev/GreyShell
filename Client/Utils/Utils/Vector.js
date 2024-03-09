export class Vector2 {
	constructor(x, y) {
		this.x = x | 0;
		this.y = y | 0;
	}
}

export class Vector3 {
	constructor(x, y, z) {
		this.x = x | 0;
		this.y = y | 0;
		this.z = z | 0;
	}
	GetMagnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	Sub(vector3) {
		return new Vector3(
			this.x - vector3.x,
			this.y - vector3.y,
			this.z - vector3.z,
		);
	}
	Normalize() {
		var magnitude = this.GetMagnitude();
		if (magnitude == 0) return;
		this.x /= magnitude;
		this.y /= magnitude;
		this.y /= magnitude;
	}

	Dot(vector3) {
		return this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
	}
}
