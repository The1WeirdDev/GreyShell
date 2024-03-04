const canvas = document.getElementById("GameCanvas");
const context = canvas.getContext("2d");

var map = [];
const game_size_x = 10;
const game_size_y = 20;
var block_size = 0;
var tetris_piece = null;

class TetrisPiece {
  constructor(block_data) {
    this.x = Math.floor((game_size_x - 1) / 2);
    this.y = 0;
    this.block_data = block_data;
    this.color = 1;
    this.move_dir = 0;
  }

  GetBlockData() {
    return this.block_data;
  }

  AttemptMove(x_dir, y_dir) {
    for (var i = 0; i < 8; i += 2) {
      var x = this.block_data[i] + this.x;
      var y = this.block_data[i + 1] + this.y;

      if (
        GetBlock(x + x_dir, y + y_dir) > 0 ||
        x + x_dir < 0 ||
        x + x_dir >= game_size_x ||
        y + y_dir < 0 ||
        y + y_dir >= game_size_y
      )
        return false;
    }

    this.x += x_dir;
    this.y += y_dir;
    return true;
  }
  Update() {
    this.AttemptMove(this.move_dir, 0);
    if (this.AttemptMove(0, 1) == false) {
      this.debounce_frames--;
      if (this.debounce_frames <= 0) {
        this.PlacePiece();
        this.x = Math.floor((game_size_x - 1) / 2);
        this.y = 0;
      }
    } else {
      this.debounce_frames = 5;
    }
  }
  Draw() {
    for (var i = 0; i < 8; i += 2) {
      DrawRect(
        (this.block_data[i] + this.x) * block_size,
        (this.block_data[i + 1] + this.y) * block_size,
        block_size,
        block_size,
        GetColorFromBlockId(this.color),
        true,
      );
    }
  }

  DropPiece() {
    while (true) {
      if (this.AttemptMove(0, 1) == false) break;
    }
  }

  PlacePiece(){
    for (var i = 0; i < 8; i += 2) {
      var x = this.block_data[i] + this.x;
      var y = this.block_data[i + 1] + this.y;

      map[(y * game_size_x) + x] = this.color;
    }
  }
  OnKeyDown(e) {
    if (e.repeat) return;
    var key_code = e.keyCode;

    if (key_code == 32) this.DropPiece();

    if (key_code == 65) this.move_dir = -1;
    if (key_code == 68) this.move_dir = 1;
  }
  OnKeyUp(e) {
    var key_code = e.keyCode;
    if (key_code == 65 && this.move_dir == -1) this.move_dir = 0;
    if (key_code == 68 && this.move_dir == 1) this.move_dir = 0;
  }
}

function GetColorFromBlockId(id) {
  switch (id) {
    case 1:
      return "red";

    case 2:
      return "blue";

    case 3:
      return "purple";

    case 4:
      return "green";

    case 5:
      return "yellow";
    default:
      return "black";
  }
}
function Init() {
  canvas.width = 330;
  canvas.height = canvas.width * 2;
  block_size = Math.floor(canvas.width / game_size_x);
  tetris_piece = new TetrisPiece([0, 0, 0, 1, 1, 0, 1, 1]);

  document.addEventListener("keydown", function (e) {
    tetris_piece.OnKeyDown(e);
  });

  document.addEventListener("keyup", function (e) {
    tetris_piece.OnKeyUp(e);
  });

  map = new Array(game_size_x * game_size_y);
  map.fill(0, 0, map.length);
  setInterval(Update, 1000 / 10);
}

function Update() {
  tetris_piece.Update();
  Draw();
}
function Draw() {
  DrawRect(0, 0, canvas.width, canvas.height, "black");

  for (var x = 0; x < game_size_x; x++) {
    for (var y = 0; y < game_size_y; y++) {
      DrawRect(
        x * block_size,
        y * block_size,
        block_size,
        block_size,
        GetColorFromBlockId(GetBlock(x, y)),
        true
      );
    }
  }

  tetris_piece.Draw();
}

function GetBlock(x, y) {
  if (x < 0 || x >= game_size_x || y < 0 || y >= game_size_y) return 0;
  return map[y * game_size_x + x];
}
function SetBlock(x, y, id) {
  if (x < 0 || x >= game_size_x || y < 0 || y >= game_size_y) return;
  map[y * game_size_x + x] = id;
}
function DrawRect(x, y, width, height, color, border) {
  if (border) {
    /*
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.rect(x, y, width, height);
    context.stroke();
		*/
    context.fillStyle = "black";
    context.fillRect(x, y, width, height);
    context.fillStyle = color;
    context.fillRect(x + 1, y + 1, width - 1, height - 1);

    return;
  }
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}
window.onload = Init;
