import { isTablet } from "react-device-detect";

export interface INative<T = any> {
  get getInterface(): T;
}

/**
 * Core functions for native functions/interfaces
 */
export class Native<I = any> implements INative<I> {
  private readonly userAgentAndroid = "MMRL";
  public readonly userAgent = window.navigator.userAgent;
  public readonly isAndroid = this.userAgentAndroid === this.userAgent || window.hasOwnProperty("cordova") ? true : false;
  public readonly isTablet = this.IsTablet();
  /**
   * This field is required, otherwise the comunacation between Android will not work
   * @required true
   */
  public interface: keyof AndroidWindow<I> | undefined;

  public constructor() {
    this.IsTablet = this.IsTablet.bind(this);
  }

  private IsTablet(): boolean {
    if (this.isAndroid) {
      return (window["os" as any] as any).isTablet();
    } else {
      return isTablet;
    }
  }

  public get getInterface(): I {
    if (this.interface) {
      return window[this.interface];
    } else {
      throw new Error("No interface defined");
    }
  }
}
