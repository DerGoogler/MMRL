import Log from "@Native/Log";
import { os } from "./os";

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
type Shell = typeof Shell[keyof typeof Shell];
const Shell: ShellNative = {
  command: "",

  cmd(cmd: string): CMD {
    this.command = cmd;
    return this;
  },

  exec(): void {
    if (os.isAndroid) {
      nshell.exec(this.command);
    } else {
      Logger.i(this.command);
    }
  },

  result(): string {
    if (os.isAndroid) {
      return nshell.result(this.command);
    } else {
      return this.command;
    }
  },

  isAppGrantedRoot(): boolean {
    return nshell.isAppGrantedRoot();
  },
} as const;

export default Shell;
