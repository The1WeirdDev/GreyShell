import Frame from "/utils/Webgl/UI/Frame.js";
import UI from "/utils/Webgl/UI/UI.js";

export default class TexturedFrame extends Frame {
  constructor(x, y, width, height, texture) {
    super(x, y, width, height, [1, 1, 1]);
    this.texture = texture;
    UI.uis.push(this);
  }

  Bind() {
    if (texture) texture.Bind();
  }
}