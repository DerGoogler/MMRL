import ons from "onsenui";
import React, { useCallback } from "react";
import { useEventListener } from "usehooks-ts";
import { Native } from "./Native";

/**
 * The `os` module provides operating system-related utility methods and
 * properties. It can be accessed using:
 *
 * ```js
 * import os from "@Native/os"
 * ```
//  */
// class os extends Native {
//   private static readonly userAgentAndroid = Constants.UserAgentAndroid;
//   public static readonly userAgent = window.navigator.userAgent;
//   public static readonly isAndroid = this.userAgentAndroid === this.userAgent || window.hasOwnProperty("cordova") ? true : false;
//   private static readonly android = os.isAndroid;

//   public static getSchemeParam(param: string): string {
//     if (os.android) {
//       return nos.getSchemeParam(param);
//     } else {
//       param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
//       var regex = new RegExp("[?&]" + param + "=([^&#]*)");
//       var url = decodeURIComponent(window.location.href);
//       var match = regex.exec(url);
//       return match ? match[1] : "";
//     }
//   }

//   public static hasStoragePermission(): boolean {
//     if (this.android) {
//       return nos.hasStoragePermission();
//     } else {
//       return true;
//     }
//   }

//   public static requestStoargePermission(): void {
//     if (this.android) {
//       nos.requestStoargePermission();
//     } else {
//       name;
//     }
//   }

//   /**
//    * Create an simple dialog that's supports JSX
//    * @param message
//    */
//   public static alert(message: string | JSX.Element): void {
//     // @ts-ignore Type 'string | Element' is not assignable to type 'string | undefined'. Type 'Element' is not assignable to type 'string'.ts(2322)
//     ons.notification.alert({ messageHTML: isValidElement(message) ? renderToStaticMarkup(message) : message });
//   }

//   public static close(): void {
//     if (os.android) {
//       nos.close();
//     } else {
//       window.close();
//     }
//   }

//   public static open(link: string): void {
//     if (os.android) {
//       nos.open(link);
//     } else {
//       window.open(link, "_blank");
//     }
//   }

//   // /**
//   //  * Getting theme color for Android devices that over Android 12
//   //  * @param id Get the monet color
//   //  * @param fallback Is used when the Android version is lower than 12
//   //  * @returns Current hex string of monet theme
//   //  */
//   // public static getMonetColor(id: string, fallback: string): string {
//   //   if (os.isAndroid && SharedPreferences.getBoolean("enableMonet", false) && BuildConfig.VERSION.SDK_INT > Build.VERSION_CODES.S) {
//   //     return nos.getMonetColor(id);
//   //   } else {
//   //     return fallback;
//   //   }
//   // }

//   /**
//    * Changes the status bar color
//    * @param color Your color
//    * @param white `true` makes the status bar white
//    */
//   public static setStatusBarColor(color: string, white: bool): void {
//     if (os.isAndroid) {
//       nos.setStatusBarColor(color, white);
//     } else {
//       name;
//     }
//   }
//   public static setNavigationBarColor(color: string): void {
//     if (os.isAndroid) {
//       nos.setNavigationBarColor(color);
//     } else {
//       name;
//     }
//   }

//   public androidSdk(): number {
//     if (this.isAndroid) {
//       return this.getInterface.androidSdk();
//     } else {
//       return 0;
//     }
//   }

//   public getMonetColor(id: string): string {
//     if (this.isAndroid) {
//       return this.getInterface.getMonetColor(id);
//     } else {
//       return "#ffffff";
//     }
//   }
// }

// export { os };

export type OpenOptions = {
  target?: string | undefined;
  features?:
    | {
        window?: string | undefined;
        /**
         * Only for Android
         */
        color?: string | undefined;
      }
    | undefined;
};

class OsClass extends Native {
  public constructor() {
    super();
    this.interface = "__os__";
  }

  public open(url?: string | URL | undefined, options?: OpenOptions): Window | null {
    if (this.isAndroid) {
      return this.getInterface.open(url, options?.features?.color || "#fffddd");
    } else {
      return window.open(url, options?.target, options?.features?.window);
    }
  }

  public hasStoragePermission(): boolean {
    if (this.isAndroid) {
      return this.getInterface.hasStoragePermission();
    } else {
      return true;
    }
  }

  public requestStoargePermission(): void {
    if (this.isAndroid) {
      this.getInterface.requestStoargePermission();
    } else {
      name;
    }
  }

  /**
   * Closes the window. On Android closes the App
   */
  public close(): void {
    this.isAndroid ? this.getInterface.close() : window.close();
  }

  /**
   * Makes an toast, even on Android
   * @param text
   * @param duration
   */
  public toast(text: string, duration: "long" | "short"): void {
    const _duration = duration === "short" ? (this.isAndroid ? 0 : 2000) : this.isAndroid ? 1 : 5000;
    if (this.isAndroid) {
      this.getInterface.makeToast(text, _duration);
    } else {
      ons.notification.toast(text, { timeout: _duration, animation: "ascend" });
    }
  }

  public androidSdk(): number {
    if (this.isAndroid) {
      return this.getInterface.androidSdk();
    } else {
      return 0;
    }
  }

  public getMonetColor(id: string): string {
    if (this.isAndroid) {
      return this.getInterface.getMonetColor(id);
    } else {
      return "#ffffff";
    }
  }

  /**
   * Changes the status bar color
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean): void {
    this.isAndroid ? this.getInterface.setStatusBarColor(color, white) : null;
  }

  public setNavigationBarColor(color: string): void {
    this.isAndroid ? this.getInterface.setNavigationBarColor(color) : null;
  }

  public addNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.addEventListener(type.toLowerCase(), callback, options);
  }

  public removeNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.removeEventListener(type.toLowerCase(), callback, options);
  }
}

export const os: OsClass = new OsClass();
