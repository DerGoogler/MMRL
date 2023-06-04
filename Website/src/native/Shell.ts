import Log from "@Native/Log";
import { os } from "./os";
import { Native, NativeStatic } from "./Native";

type CMD = Omit<ShellNative, "isAppGrantedRoot" | "cmd" | "command">;

interface ShellNative {
  command: string;
  /**
   * Runs an Android native shell cmd
   * Should never used multiple
   * @return {CMD}
   */
  cmd(cmd: string): CMD;
  /**
   * Executes an command without result
   */
  exec(): void;
  /**
   * Executes an command with result
   */
  result(): string;
  isAppGrantedRoot(): boolean;
}

const Logger = new Log("Shell");

/**
 * Run Shell commands native on Android
 */

class Shell extends NativeStatic {
  public static interface: string = "nshell";

  public static exec(cmds: string | string[]): void {
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

  public static result(cmd: string): string {
    if (this.isAndroid) {
      return this.getInterface.result(cmd);
    } else {
      return cmd;
    }
  }

  public static isAppGrantedRoot(): boolean {
    return this.getInterface.isAppGrantedRoot();
  }
}

export default Shell;
