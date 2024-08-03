import { Native } from "./Native";
import { Shell } from "./Shell";

class MagiskClass extends Native {
  public constructor() {
    super({});
  }

  /**
   * Get current installed Magisk version code
   */
  public get VERSION_CODE(): number {
    if (this.isAndroid) {
      return parseInt(Shell.cmd("magisk -V").result());
    } else {
      return 0;
    }
  }

  public get VERSION_NAME(): string {
    if (this.isAndroid) {
      return Shell.cmd("magisk -v").result();
    } else {
      return "0:MAGISKSU";
    }
  }

  /**
   * `XX.Y` is parsed as `XXY00`, so you can just put the Magisk version name.
   * @param version
   * @returns
   */
  public PARSE_VERSION(version: str): number {
    const i = version.indexOf(".");
    if (i == -1) {
      return parseInt(version);
    } else {
      return parseInt(version.substring(0, i)) * 1000 + parseInt(version.substring(i + 1)) * 100;
    }
  }
}

/**
 * @deprecated Use `Shell` instead
 */
export const Magisk: MagiskClass = new MagiskClass();
