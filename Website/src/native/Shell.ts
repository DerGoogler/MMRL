import { Native } from "./Native";
import { SuFile } from "./SuFile";

interface NativeShell {
  /**
   * Executes an command without result
   */
  exec(command: string): void;
  /**
   * Executes an command with result
   */
  result(command: string): string;
  isSuccess(command: string): boolean;
  getCode(command: string): number;
  /**
   * Checks if the app has been granted root privileges
   * @deprecated Use `Shell.isSuAvailable()` instead
   */
  isAppGrantedRoot(): boolean;
  /**
   * Checks if the app has been granted root privileges
   */
  isSuAvailable(): boolean;
  isKernelSU(): boolean;
  isMagiskSU(): boolean;
  isAPatchSU(): boolean;
  getenv(key: string): string;
  setenv(key: string, value: string, override: number): void;
  pw_uid(): number;
  pw_gid(): number;
  pw_name(): string;
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

  public readonly MODULE_INSTALL_SUCCESS = 0;
  public readonly MODULE_INSTALL_FAILURE = 1;
  public readonly TERMINAL_INTERNAL_ERROR = 500;

  public constructor() {
    super(window.__shell__);
    this._command = "";
  }

  public cmd(cmd: string): this {
    this._command = cmd;
    return this;
  }

  public exec(): void {
    if (this.isAndroid) {
      this.interface.exec(this._command);
    }
  }

  public result(): string {
    if (this.isAndroid) {
      return this.interface.result(this._command);
    } else {
      return this._command;
    }
  }

  public isSuccess(): boolean {
    if (this.isAndroid) {
      return this.interface.isSuccess(this._command);
    } else {
      return false;
    }
  }

  public getCode(): number {
    if (this.isAndroid) {
      return this.interface.getCode(this._command);
    } else {
      return 1;
    }
  }
  /**
   * Checks if the app has been granted root privileges
   * @deprecated Use `Shell.isSuAvailable()` instead
   */
  public isAppGrantedRoot(): boolean {
    return this.interface.isAppGrantedRoot();
  }

  /**
   * Checks if the app has been granted root privileges
   */
  public isSuAvailable(): boolean {
    return this.interface.isSuAvailable();
  }

  /**
   * Get current installed Superuser version code
   */
  public VERSION_CODE(): number {
    if (this.isAndroid) {
      return parseInt(this.interface.result("su -V"));
    } else {
      return 0;
    }
  }

  public VERSION_NAME(): string {
    if (this.isAndroid) {
      return this.interface.result("su -v");
    } else {
      return "0:SU";
    }
  }

  public getRootManager(): string {
    if (this.isMagiskSU()) {
      return "Magisk";
    } else if (this.isKernelSU()) {
      return "KernelSU";
    } else if (this.isAPatchSU()) {
      return "APatchSU";
    } else {
      return "Unknown";
    }
  }

  /**
   * Use regex for better detection
   * @param searcher
   * @returns
   */
  private _mountDetect(searcher: { [Symbol.search](string: string): number }): boolean {
    const proc = new SuFile("/proc/self/mounts");

    if (proc.exist()) {
      return proc.read().search(searcher) !== -1;
    } else {
      return false;
    }
  }

  /**
   * Determine if MMRL runs with KernelSU
   */
  public isKernelSU(): boolean {
    // `proc.exist()` is always `false` on browsers
    return this._mountDetect(/(KSU|KernelSU)/);
  }

  /**
   * Determine if MMRL runs with Magisk
   */
  public isMagiskSU(): boolean {
    // `proc.exist()` is always `false` on browsers
    return this._mountDetect(/(magisk|core\/mirror|core\/img)/);
  }

  /**
   * Determine if MMRL runs with APatch
   */
  public isAPatchSU(): boolean {
    // `proc.exist()` is always `false` on browsers
    return this._mountDetect(/(APD|APatch)/);
  }

  /**
   * Returns the current user id
   * @returns {strign} User ID
   */
  public pw_uid(): string {
    if (this.isAndroid) {
      return this.interface.result("id -u");
    } else {
      return "Unknown";
    }
  }

  /**
   * Returns the current group id
   * @returns {string} Group ID
   */
  public pw_gid(): string {
    if (this.isAndroid) {
      return this.interface.result("id -g");
    } else {
      return "Unknown";
    }
  }

  /**
   * Returns the current user name
   * @returns {string} User name
   */
  public pw_name(): string {
    if (this.isAndroid) {
      return this.interface.result("id -un");
    } else {
      return "Unknown";
    }
  }
}

const Shell: ShellClass = new ShellClass();
export { Shell, ShellClass };
