export interface INative<T = any> {
  get interface(): T;
}

export type NativeArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

/**
 * Core functions for native functions/interfaces
 */
export class Native<I = any> implements INative<I> {
  private _internal_interface: I;

  /**
   * This field is required, otherwise the comunacation between Android will not work
   * @required true
   */
  public constructor(i: I) {
    this._internal_interface = i;
  }

  private static get userAgentRegex(): RegExp {
    return /MMRL\/(.+)\s\(Linux;\sAndroid\s(.+);\s(.+)\sBuild\/(.+)\)/gs;
  }

  public static get userAgent(): string {
    return window.navigator.userAgent;
  }

  /**
   * Determine if MMRL runs on a Android device
   */
  public static get isAndroid(): boolean {
    return this.userAgentRegex.test(this.userAgent) || window.hasOwnProperty("cordova") ? true : false;
  }

  /**
   * Determine if MMRL runs on a Android device
   */
  public get isAndroid(): boolean {
    return Native.isAndroid;
  }

  public get interface(): I {
    return this._internal_interface;
  }

  public static get interface() {
    return Native.prototype.interface;
  }
}
