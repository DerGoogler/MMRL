import { Native } from "./Native";

interface NativeShell {
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

interface IShell {
  exec(): void;
  result(): string;
}

/**
 * Run Shell commands native on Android
 */

class ShellClass extends Native<NativeShell> {
  private _command: string;
  public constructor() {
    super();
    this._command = "";
    this.interfaceName = "__shell__";
  }

  public cmd(cmd: string): this {
    this._command = cmd;
    return this;
  }

  public exec(): void {
    if (this.isAndroid) {
      this.getInterface.exec(this._command);
    }
  }

  public result(): string {
    if (this.isAndroid) {
      return this.getInterface.result(this._command);
    } else {
      return this._command;
    }
  }

  public isAppGrantedRoot(): boolean {
    return this.getInterface.isAppGrantedRoot();
  }
}

export const Shell: ShellClass = new ShellClass();
