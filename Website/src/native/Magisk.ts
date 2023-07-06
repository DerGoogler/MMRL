import Log from "./Log";
import { os } from "./Os";
import { Shell } from "./Shell";

class Magisk {
  private static log: Log = new Log(this.constructor.name);
  /**
   * Get current installed Magisk version code
   */
  public static get VERSION_CODE(): number {
    if (os.isAndroid) {
      return parseInt(Shell.result("magisk -V"));
    } else {
      return 0;
    }
  }

  public static get VERSION_NAME(): string {
    if (os.isAndroid) {
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
  public static PARSE_VERSION(version: string): number {
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
  public static INSTALL_MODULE(path: string): void {
    if (os.isAndroid) {
      Shell.exec(`magisk --install-module ${path}`);
    } else {
      this.log.e("Error installing Magisk module.");
    }
  }

  /**
   * Removes all Magisk modules and reboot
   * @warn Dangerus usage, keep it private!
   */
  private static REMOVE_MODULES(): void {
    if (os.isAndroid) {
      Shell.exec(`magisk --remove-modules`);
    } else {
      this.log.e("Error removing Magisk modules.");
    }
  }
}

export default Magisk;
