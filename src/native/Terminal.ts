import { Native } from "./Native";

interface TerminalExec {
  command: string;
  /**
   * Environment variables that should be used in your command execution
   */
  env?: Record<string, string>;
  /**
   * Working directory
   */
  cwd?: string;
  /**
   * Prints the error to the console or the `onLine` argument
   * @default true
   */
  printError?: boolean;
  onLine: (line: string) => void;
  onExit?: ((code: number) => void) | null;
}

type TerminalOptions = Omit<TerminalExec, "onLine" | "onExit" | "env" | "command">;

interface TerminalNative {
  exec(options: TerminalExec): void;
}

export type TerminalEnv = Record<string, string>;

class Terminal extends Native<TerminalNative> {
  private _env: TerminalEnv = {};
  public cwd: string | undefined;
  printErrors: boolean | undefined;
  private _onLine: ((line: string) => void) | undefined;
  private _onExit: ((code: number) => void) | undefined | null;

  public constructor(options?: TerminalOptions) {
    super(window.__terminal__);

    this.cwd = options?.cwd;
    this.printErrors = options?.printError;
  }

  public set onLine(func: TerminalExec["onLine"]) {
    this._onLine = func;
  }

  public set onExit(func: TerminalExec["onExit"]) {
    this._onExit = func;
  }

  public get env(): TerminalEnv {
    return this._env;
  }

  public set env(envs: TerminalEnv) {
    this._env = envs;
  }

  public exec(command: string): void {
    if (this.isAndroid) {
      if (typeof this._onLine !== "function") throw new TypeError("Terminal 'onLine' is not a function");

      this.interface.exec({
        command: command,
        cwd: this.cwd,
        env: this.env,
        onLine: this._onLine,
        onExit: this._onExit,
        printError: this.printErrors,
      });
    }
  }
}

export { Terminal };
