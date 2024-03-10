import { SizeConstraint,WrapMode,TextAlignMode } from "/utils/Webgl/UI/UI.js";
import UI from "/utils/Webgl/UI/UI.js";

//Should we create a texture or not?

export default class TextLabel extends UI {
  constructor(x, y, width, height, text) {
    super(x, y, width, height);
    this.text = text;
    this.font_size = 0.12;

    this.wrap_mode = WrapMode.WrapAround;
    this.clip_descendents = true;

    this.text_align = TextAlignMode.None;

    UI.uis.push(this);
  }

  SetTextAlignMode(mode){
    this.text_align = mode;
  }
}
