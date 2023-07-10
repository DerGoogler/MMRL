import { Native } from "./Native";
import { Shell } from "./Shell";

class MagiskClass extends Native {
  /**
   * Get current installed Magisk version code
   */
  public get VERSION_CODE(): number {
    if (this.isAndroid) {
      return parseInt(Shell.result("magisk -V"));
    } else {
      return 0;
    }
  }

  public get VERSION_NAME(): string {
    if (this.isAndroid) {
      return Shell.result("magisk -v");
    } else {
      return "0:MAGISKSU";
    }
  }

  /**
   * `XX.Y` is parsed as `XXY00`, so you can just put the Magisk version name.
   * @param version
   * @returns
   */
  public PARSE_VERSION(version: string): number {
    const i = version.indexOf(".");
    if (i == -1) {
      return parseInt(version);
    } else {
      return parseInt(version.substring(0, i)) * 1000 + parseInt(version.substring(i + 1)) * 100;
    }
  }

  /**
   * Installs an Magisk module from path
   * @param path Directory path
   */
  public INSTALL_MODULE(path: string): void {
    if (this.isAndroid) {
      Shell.exec(`magisk --install-module ${path}`);
    } else {
      console.error("Error installing Magisk module.");
    }
  }

  /**
   * Removes all Magisk modules and reboot
   * @warn Dangerus usage, keep it private!
   */
  private REMOVE_MODULES(): void {
    if (this.isAndroid) {
      Shell.exec(`magisk --remove-modules`);
    } else {
      console.error("Error removing Magisk modules.");
    }
  }
}

export const Magisk: MagiskClass = new MagiskClass();
