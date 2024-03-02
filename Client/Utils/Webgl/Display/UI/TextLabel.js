import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import { SizeConstraint } from "/utils/Webgl/Display/UI/UI.js";
import { WrapMode } from "/utils/Webgl/Display/UI/UI.js";
import UI from "/utils/Webgl/Display/UI/UI.js";

//Should we create a texture or not?

export default class TextLabel extends UI {
  constructor(x, y, width, height, text) {
    super(x, y, width, height);
    this.text = text;

    this.wrap_mode = WrapMode.WrapAround;
    this.clip_descendents = true;

    UI.uis.push(this);
  }
}
