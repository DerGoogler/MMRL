import { Native } from "./Native";

type AllowedLogTypes = Pick<Console, "info" | "warn" | "error" | "debug">;

class Log extends Native {
  private _tag: string;

  public static VERBOSE: number = 2;
  public static DEBUG: number = 3;
  public static INFO: number = 4;
  public static WARN: number = 5;
  public static ERROR: number = 6;

  public constructor(tag: string) {
    super(window.__log__);
    this._tag = tag;
  }

  public v(message: string) {
    this._native_log(Log.INFO, "info", message);
  }

  public d(message: string) {
    this._native_log(Log.DEBUG, "debug", message);
  }
  public i(message: string) {
    this._native_log(Log.INFO, "info", message);
  }

  public w(message: string) {
    this._native_log(Log.WARN, "warn", message);
  }

  public e(message: string) {
    this._native_log(Log.ERROR, "error", message);
  }

  private _native_log(prio: number, bPrio: keyof AllowedLogTypes, message: string) {
    if (this.isAndroid) {
      this.interface.native_log(prio, String(this._tag), String(message));
    } else {
      console[bPrio](`[${this._tag}] -> ${message}`);
    }
  }

  public static v(tag: string, message: string) {
    new Log(tag).v(message);
  }
  public static d(tag: string, message: string) {
    new Log(tag).d(message);
  }

  public static i(tag: string, message: string) {
    new Log(tag).i(message);
  }

  public static w(tag: string, message: string) {
    new Log(tag).w(message);
  }

  public static e(tag: string, message: string) {
    new Log(tag).e(message);
  }
}

export { Log };
