class WebPages {
  static IsGameName(name) {
    switch (name) {
      case "snake":
      case "rizzy":
      case "matching":
      case "tetris":
      case "snake2":
      case "fnaf4":
      case "fnaf3":
      case "fnaf2":
      case "fnaf1":
      case "test":
        return true;
      default:
        return false;
    }
  }

  static IsCompilerName(name){
    switch(name){
      case "A++":
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
