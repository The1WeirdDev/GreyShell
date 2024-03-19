export default class PPU {
  //0x2000 - 0x2007
  static PPU_CTRL_LOC = 0x2000;
  static PPU_MASK_LOC = 0x2001;
  static PPU_STATUS_LOC = 0x2002;
  static OAMADDR_LOC = 0x2003;
  static OAMDATA_LOC = 0x2004;
  static PPU_SCROLL_LOC = 0x2005;
  static PPU_ADDR_DATA = 0x2006;
  static PPU_DATA_LOC = 0x2007;
  static OAMDMA_LOC = 0x4014;

  constructor(bus) {
    this.canvas = document.getElementById("EmuCanvas");
    this.context = this.canvas.getContext("2d");

    this.scale = 2.25;
    this.canvas.width = 256 * this.scale;
    this.canvas.height = 240 * this.scale;
    this.screen_buffer = new Uint8Array(256 * 240);

    this.bus = bus;

    this.SetMemVal(PPU.PPU_CTRL_LOC, 0);
    this.SetMemVal(PPU.PPU_MASK_LOC, 0);
    this.SetMemVal(PPU.PPU_STATUS_LOC, 0);
    this.SetMemVal(PPU.OAMADDR_LOC, 0);
    this.SetMemVal(PPU.OAMDATA_LOC, 0);
    this.SetMemVal(PPU.PPU_SCROLL_LOC, 0);
    this.SetMemVal(PPU.PPU_ADDR_DATA, 0);
    this.SetMemVal(PPU.PPU_DATA_LOC, 0);
    this.SetMemVal(PPU.OAMDMA_LOC, 0);
  }

  GetMemVal(addr) {
    return this.bus.GetMemVal(addr);
  }
  SetMemVal(addr, val) {
    this.bus.SetMemVal(addr, val);
  }

  Reset() {
    this.SetMemVal(PPU.PPU_CTRL_LOC, 0);
    this.SetMemVal(PPU.PPU_MASK_LOC, 0);
    this.SetMemVal(PPU.OAMDATA_LOC, 0);
    this.SetMemVal(PPU.PPU_SCROLL_LOC, 0);
    this.SetMemVal(PPU.PPU_DATA_LOC, 0);
  }

  FillRect(x,y, width, height, color){
    this.context.fillStyle = color;
    this.context.fillRect(x,y, width, height);
  }
  Clock() {
    this.SetMemVal(PPU.PPU_STATUS_LOC, 255);

    this.FillRect(0,0, this.canvas.width, this.canvas.height, "hsl(259, 99%, 50%)");
  }
}
