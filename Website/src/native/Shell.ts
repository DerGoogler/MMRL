import Log from "@Native/Log";
import { os } from "./os";

type cmdReturn = Omit<IShell, "isAppGrantedRoot" | "cmd">;

interface IShell {
  cmd(cmd: string): cmdReturn;
  exec(): void;
  result(): string;
  isAppGrantedRoot(): boolean;
}

/**
 * Run Shell commands native on Android
 * @implements {IShell}
 */
class ShellClass implements IShell {
  private command: string;
  private log: Log;

  public constructor() {
    this.log = new Log(this.constructor.name);
    this.command = "";
  }

  /**
   * Runs an Android native shell cmd
   * Should never used multiple
   */
  public cmd(cmd: string): cmdReturn {
    this.command = cmd;
    return this;
  }

  /**
   * Executes an command without result
   */
  public exec(): void {
    if (os.isAndroid) {
      nshell.exec(this.command);
    } else {
      this.log.i(this.command);
    }
  }

  /**
   * Executes an command with result
   */
  public result(): string {
    if (os.isAndroid) {
      return nshell.result(this.command);
    } else {
      return this.command;
    }
  }

  public isAppGrantedRoot(): boolean {
    return nshell.isAppGrantedRoot();
  }
}

const Shell: IShell = new ShellClass();

export default Shell;
export { ShellClass, IShell };
