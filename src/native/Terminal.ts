import { Log } from "./Log";
import { Native } from "./Native";

type TerminalStream = {
  stdout: string | null;
  stderr: string | null;
};

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
  onLine: (stream: TerminalStream) => void;
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
  private _onLine: ((stdout: string) => void) | undefined;
  private _onExit: ((code: number) => void) | undefined | null;
  private _onError: ((stderr: string) => void) | undefined | null;

  public constructor(options?: TerminalOptions) {
    super(window.__terminal__);

    this.cwd = options?.cwd;
    this.printErrors = options?.printError;
  }

  public set onLine(func: (stdout: string) => void) {
    this._onLine = func;
  }

  public set onError(func: (stderr: string) => void) {
    this._onError = func;
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
        onLine: (stream: TerminalStream) => {
          if (stream.stdout && this._onLine) {
            this._onLine(stream.stdout);
          } else if (stream.stdout && this._onError) {
            this._onError(stream.stdout);
          } else {
            Log.e("Terminal:exec", "Unable to find proper terminal stream");
          }
        },
        onExit: this._onExit,
      });
    }
  }
}

export { Terminal };
