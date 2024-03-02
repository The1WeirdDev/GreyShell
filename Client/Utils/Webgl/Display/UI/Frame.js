import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import { SizeConstraint } from "/utils/Webgl/Display/UI/UI.js";
import UI from "/utils/Webgl/Display/UI/UI.js";

export default class Frame extends UI {
  constructor(x, y, width, height, background_color, size_constraint) {
    super(x, y, width, height, size_constraint);

    if (background_color == null) background_color = [1, 1, 1];
    this.background_color = background_color;

    UI.uis.push(this);
  }
}
