import { isTablet } from "react-device-detect";

export interface INative<T = any> {
   get getInterface(): T;
}

/**
 * Core functions for native functions/interfaces
 */
export class Native<T = any> implements INative<T> {
  private readonly userAgentAndroid = "MMRL";
  public readonly userAgent = window.navigator.userAgent;
  public readonly isAndroid = this.userAgentAndroid === this.userAgent || window.hasOwnProperty("cordova") ? true : false;
  public readonly isTablet = this.IsTablet();
  public interface: string;

  public constructor() {
    this.IsTablet = this.IsTablet.bind(this);
    this.interface = "";
  }

  private IsTablet(): boolean {
    if (this.isAndroid) {
      return (window["nos" as any] as any).isTablet();
    } else {
      return isTablet;
    }
  }

  public get getInterface(): T {
    // @ts-ignore
    return window[this.interface];
  }
}


export class NativeStatic {
    private static  readonly userAgentAndroid = "MMRL";
    public static readonly userAgent = window.navigator.userAgent;
    public static readonly isAndroid = this.userAgentAndroid === this.userAgent || window.hasOwnProperty("cordova") ? true : false;
    public static readonly isTablet = this.IsTablet();
    public static interface: string;
  
    private static IsTablet(): boolean {
      if (this.isAndroid) {
        return (window["nos" as any] as any).isTablet();
      } else {
        return isTablet;
      }
    }
  
    public static get getInterface() {
      // @ts-ignore
      return window[this.interface];
    }
  }