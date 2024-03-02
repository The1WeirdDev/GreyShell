import Globals from "/utils/Webgl/Globals.js";

export default class Texture {
  static text_textures = [];

  constructor() {
    this.width = 1;
    this.height = 1;
    this.aspect_ratio = 1;
    this.texture = null;
  }

  SetTexture(texture) {
    this.texture = texture;
  }

  Bind() {
    //gl.activeTexture(gl.TEXTURE0);
    Globals.gl.bindTexture(Globals.gl.TEXTURE_2D, this.texture);
  }

  static UnBind() {
    Globals.gl.bindTexture(Globals.gl.TEXTURE_2D, null);
  }

  LoadTexture(url, default_color) {
    const gl = Globals.gl;
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    // Because images have to be downloaded over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;

    if (default_color == null) default_color = [255, 255, 255, 255];
    const pixel = new Uint8Array(default_color); // opaque blue
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      this.width,
      this.height,
      border,
      srcFormat,
      srcType,
      pixel,
    );

    const image = new Image();
    image.onload = () => {
      Globals.gl.bindTexture(gl.TEXTURE_2D, this.texture);
      Globals.gl.texImage2D(
        Globals.gl.TEXTURE_2D,
        level,
        internalFormat,
        srcFormat,
        srcType,
        image,
      );
      this.width = image.width;
      this.height= image.height;
      this.aspect_ratio = this.width / this.height;;

      Globals.gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.NEAREST,
      );
      Globals.gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        gl.NEAREST,
      );

      Globals.gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_S,
        gl.CLAMP_TO_EDGE,
      );
      Globals.gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_WRAP_T,
        gl.CLAMP_TO_EDGE,
      );
    };
    image.src = url;
  }

  static CreateTextureFromTextCanvas() {
    const gl = Globals.gl;
    var texture = new Texture();
    texture.width = Texture.text_canvas.width;
    texture.height = Texture.text_canvas.height;
    texture.aspect_ratio = texture.width / texture.height;

    texture.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      Texture.text_canvas,
    );

    Globals.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    Globals.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    Globals.gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_S,
      gl.CLAMP_TO_EDGE,
    );
    Globals.gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_T,
      gl.CLAMP_TO_EDGE,
    );
    return texture;
  }

  static CreateTextTextures() {
    Texture.text_canvas = document.getElementById("text-canvas");
    Texture.text_context = Texture.text_canvas.getContext("2d");
    Texture.text_context.fillStyle = "blue";

    document.body.appendChild(Texture.text_canvas);
    for (var i = 0; i < 200; i++) {
      var text = String.fromCharCode(i);

      Texture.text_context.font = "150px monospace";
      var metrics = Texture.text_context.measureText(text);
      const width = metrics.width;
      const height = 130;
      Texture.text_canvas.width = width;
      Texture.text_canvas.height = height;

      Texture.text_context.font = "150px monospace";
      Texture.text_context.textAlign = "left";
      Texture.text_context.textBaseline = "middle";
      Texture.text_context.fillStyle = "white";
      Texture.text_context.clearRect(
        0,
        0,
        Texture.text_canvas.width,
        Texture.text_canvas.height,
      );
      Texture.text_context.fillText(text, 0, height / 2 + 5);

      //console.log(metrics);
      Texture.text_textures.push(Texture.CreateTextureFromTextCanvas());
    }
  }
}
