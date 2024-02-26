import Frame from "/utils/Webgl/Display/UI/Frame.js";
import UI from "/utils/Webgl/Display/UI/UI.js"

export default class TexturedFrame extends Frame {
  constructor(x, y, width, height, texture) {
    super(x, y, width, height, [0, 0, 0]);
    this.texture = texture;
  }

  Bind() {
    if (texture) texture.Bind();
  }
}
