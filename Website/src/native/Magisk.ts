import Log from "./Log";
import { os } from "./os";
import Shell from "./ShellBuilder";

class Magisk {
  private static log: Log = new Log(this.constructor.name);
  /**
   * Get current installed Magisk version code
   */
  public static get VERSION_CODE(): number {
    if (os.isAndroid) {
      return parseInt(Shell.cmd("magisk -V").result());
    } else {
      return 0;
    }
  }

  public static get VERSION_NAME(): string {
    if (os.isAndroid) {
      return Shell.cmd("magisk -v").result();
    } else {
      return "0:MAGISKSU";
    }
  }

  /**
   * Installs an Magisk module from path
   * @param path Directory path
   */
  public static INSTALL_MODULE(path: string): void {
    if (os.isAndroid) {
      Shell.cmd(`magisk --install-module ${path}`).result();
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
      Shell.cmd(`magisk --remove-modules`).exec();
    } else {
      this.log.e("Error removing Magisk modules.");
    }
  }
}

export default Magisk;
