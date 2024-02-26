import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import { SizeConstraint } from "/utils/Webgl/Display/UI/UI.js";
import UI from "/utils/Webgl/Display/UI/UI.js"

export default class Frame extends UI{
  constructor(x, y, width, height, color, size_constraint) {
    super(x, y, width, height);

    if (color == null) color = [1, 1, 1];
    this.color = color;

    if (size_constraint == null) {
      size_constraint = SizeConstraint.None;
    }
    this.constraint = size_constraint;

    UI.uis.push(this);
  }

  SetSizeConstraint(size_constraint) {
    this.constraint = size_constraint;
  }
}
