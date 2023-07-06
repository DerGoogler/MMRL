import Log from "@Native/Log";
import { Native } from "./Native";

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

class ShellClass extends Native {
  public constructor() {
    super();
    this.interface = "shell";
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
