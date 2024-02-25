class WebPages {
  static IsGameName(name) {
    switch (name) {
      case "snake":
      case "1v1shooter":
      case "matching":
      case "tetris":
      case "snake2":
        return true;
      default:
        return false;
    }
  }
  static IsEmulatorName(name) {
    switch (name) {
      case "chip8":
      case "gameboy":
      case "nes":
        return true;
      default:
        return false;
    }
  }
}

module.exports = WebPages;
