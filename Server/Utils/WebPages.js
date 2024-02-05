class WebPages {
  static IsGameName(name) {
    switch (name) {
      case "snake":
      case "1v1shooter":
        return true;
      default:
        return false;
    }
  }
  static IsEmulatorName(name) {
    switch (name) {
      case "chip8":
        return true;
      default:
        return false;
    }
  }
}

module.exports = WebPages;
