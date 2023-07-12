import { Native } from "./Native";

interface IShell {
  /**
   * Executes an command without result
   */
  exec(command: string): void;
  /**
   * Executes an command with result
   */
  result(command: string): string;
  /**
   * Checks if the app has been granted root privileges
   */
  isAppGrantedRoot(): boolean;
}

/**
 * Run Shell commands native on Android
 */

class ShellClass extends Native<IShell> {
  public constructor() {
    super();
    this.interfaceName = "__shell__";
  }

  public exec(cmds: string | string[]): void {
    if (this.isAndroid) {
      if (cmds instanceof Array) {
        cmds.forEach((cmd) => {
          this.getInterface.exec(cmd);
        });
      } else {
        this.getInterface.exec(cmds);
      }
    }
  }

  public result(cmd: string): string {
    if (this.isAndroid) {
      return this.getInterface.result(cmd);
    } else {
      return cmd;
    }
  }

  public isAppGrantedRoot(): boolean {
    return this.getInterface.isAppGrantedRoot();
  }
}

export const Shell: ShellClass = new ShellClass();
