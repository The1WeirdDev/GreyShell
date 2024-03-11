import TexturedMesh from "/utils/Webgl/Display/Mesh/TexturedMesh.js";
import { SizeConstraint } from "/utils/Webgl/UI/UI.js";
import UI from "/utils/Webgl/UI/UI.js";
import Frame from "./Frame.js"

export default class Image extends UI {
  constructor(x, y, width, height, size_constraint) {
    super(x, y, width, height, size_constraint);
    this.texture = null;
    UI.uis.push(this);
  }

  SetTexture(texture){
    this.texture = texture;
  }
}
