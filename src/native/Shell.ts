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

interface NativeShellV2 extends NativeShell {
  v2(command: string): {
    exec(): void;
    result(): string;
    isSuccess(): boolean;
    getCode(): number;
  };
}

type RootManager = "Magisk" | "KernelSU" | "APatchSU" | "Unknown";

/**
 * Run Shell commands native on Android
 */
class Shell extends Native<NativeShellV2> {
  /**
   * Successful module install exit code
   */
  public static readonly M_INS_SUCCESS: number = 0;
  /**
   * Failed module install exit code
   */
  public static readonly M_INS_FAILURE: number = 1;
  /**
   * Failed file download exit code
   */
  public static readonly M_DWL_FAILURE: number = 2;
  /**
   * File creation exit code
   */
  public static readonly FILE_CRA_ERRO: number = 3;
  /**
   * Internal terminal error exit code
   */
  public static readonly TERM_INTR_ERR: number = 500;

  private _command: Array<string>;
  // @ts-ignore - Won't get even called
  private _shell: ReturnType<NativeShellV2["v2"]>;

  public constructor(command: string | Array<string>) {
    super(window.__shell__);

    if (!Array.isArray(command)) {
      this._command = [command];
    } else {
      this._command = command;
    }

    if (this.isAndroid) {
      this._shell = this.interface.v2.bind(this.interface)(JSON.stringify(this._command));
    }
  }

  public exec(): void {
    if (this.isAndroid) {
      this._shell.exec();
    }
  }

  public result(): string {
    if (this.isAndroid) {
      return this._shell.result();
    } else {
      return "";
    }
  }

  public isSuccess(): boolean {
    if (this.isAndroid) {
      return this._shell.isSuccess();
    } else {
      return false;
    }
  }

  public getCode(): number {
    if (this.isAndroid) {
      return this._shell.getCode();
    } else {
      return 1;
    }
  }

  /**
   * Compatibility method to ensure support without beaking changes
   * @param command
   * @returns
   */
  public static cmd(command: string | Array<string>): Shell {
    return new Shell(command);
  }

  /**
   * Checks if the app has been granted root privileges
   */
  public static isSuAvailable(): boolean {
    if (this.isAndroid) {
      return window.__shell__.isSuAvailable();
    }

    return false;
  }

  /**
   * Get current installed Superuser version code
   */
  public static VERSION_CODE(): number {
    if (this.isAndroid) {
      return parseInt(this.cmd("su -V").result());
    } else {
      return 0;
    }
  }

  public static VERSION_NAME(): string {
    if (this.isAndroid) {
      return this.cmd("su -v").result();
    } else {
      return "0:SU";
    }
  }

  public static getRootManager(): RootManager {
    const rootManagers: [boolean, RootManager][] = [
      [this.isMagiskSU(), "Magisk"],
      [this.isKernelSU(), "KernelSU"],
      [this.isAPatchSU(), "APatchSU"],
    ];

    for (const [check, name] of rootManagers) {
      if (check) {
        return name;
      }
    }

    return "Unknown";
  }

  /**
   * Use regex for better detection
   * @param searcher
   * @returns
   */
  private static _mountDetect(searcher: { [Symbol.search](string: string): number }): boolean {
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
  public static isKernelSU(): boolean {
    // `proc.exist()` is always `false` on browsers
    return this._mountDetect(/\b(KSU|KernelSU)\b/i);
  }

  /**
   * Determine if MMRL runs with Magisk
   */
  public static isMagiskSU(): boolean {
    // `proc.exist()` is always `false` on browsers
    return this._mountDetect(/\b(magisk|core\/mirror|core\/img)\b/i);
  }

  /**
   * Determine if MMRL runs with APatch
   */
  public static isAPatchSU(): boolean {
    // `proc.exist()` is always `false` on browsers
    return this._mountDetect(/\b(APD|APatch)\b/i);
  }

  /**
   * Returns the current user id
   * @returns {strign} User ID
   */
  public static pw_uid(): string {
    if (this.isAndroid) {
      return this.cmd("id -u").result();
    } else {
      return "Unknown";
    }
  }

  /**
   * Returns the current group id
   * @returns {string} Group ID
   */
  public static pw_gid(): string {
    if (this.isAndroid) {
      return this.cmd("id -g").result();
    } else {
      return "Unknown";
    }
  }

  /**
   * Returns the current user name
   * @returns {string} User name
   */
  public static pw_name(): string {
    if (this.isAndroid) {
      return this.cmd("id -un").result();
    } else {
      return "Unknown";
    }
  }
}

export { Shell };
