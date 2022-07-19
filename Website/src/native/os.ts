import BuildConfig from "./BuildConfig";
import Build from "./Build";
import SharedPreferences from "./SharedPreferences";
import ons from "onsenui";
import { isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Constants from "@Utils/Constants";

/**
 * The `os` module provides operating system-related utility methods and
 * properties. It can be accessed using:
 *
 * ```js
 * import os from "@Native/os"
 * ```
 */
class os {
  private static readonly userAgentAndroid = Constants.UserAgentAndroid;
  public static readonly userAgent = window.navigator.userAgent;
  public static readonly isAndroid = this.userAgentAndroid === this.userAgent || window.hasOwnProperty("cordova") ? true : false;
  private static readonly android = os.isAndroid;

  public static getSchemeParam(param: string): string {
    if (os.android) {
      return nos.getSchemeParam(param);
    } else {
      param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
      var regex = new RegExp("[?&]" + param + "=([^&#]*)");
      var url = decodeURIComponent(window.location.href);
      var match = regex.exec(url);
      return match ? match[1] : "";
    }
  }

  public static hasStoragePermission(): boolean {
    if (os.android) {
      return nos.hasStoragePermission();
    } else {
      return true;
    }
  }

  public static requestStoargePermission(): void {
    if (os.android) {
      nos.requestStoargePermission();
    } else {
      name;
    }
  }

  /**
   * Create an simple dialog that's supports JSX
   * @param message
   */
  public static alert(message: string | JSX.Element): void {
    // @ts-ignore Type 'string | Element' is not assignable to type 'string | undefined'. Type 'Element' is not assignable to type 'string'.ts(2322)
    ons.notification.alert({ messageHTML: isValidElement(message) ? renderToStaticMarkup(message) : message });
  }

  public static close(): void {
    if (os.android) {
      nos.close();
    } else {
      window.close();
    }
  }

  public static open(link: string): void {
    if (os.android) {
      nos.open(link);
    } else {
      window.open(link, "_blank");
    }
  }

  /**
   * Getting theme color for Android devices that over Android 12
   * @param id Get the monet color
   * @param fallback Is used when the Android version is lower than 12
   * @returns Current hex string of monet theme
   */
  public static getMonetColor(id: string, fallback: string): string {
    if (os.isAndroid && SharedPreferences.getBoolean("enableMonet", false) && BuildConfig.VERSION.SDK_INT > Build.VERSION_CODES.S) {
      return nos.getMonetColor(id);
    } else {
      return fallback;
    }
  }

  /**
   * Changes the status bar color
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public static setStatusBarColor(color: string, white: bool): void {
    if (os.isAndroid) {
      nos.setStatusBarColor(color, white);
    } else {
      name;
    }
  }
  public static setNavigationBarColor(color: string): void {
    if (os.isAndroid) {
      nos.setNavigationBarColor(color);
    } else {
      name;
    }
  }

  public static addNativeEventListener(event: any, callback: any) {
    // @ts-ignore
    window[event] = new Event(event.toLowerCase());

    window.addEventListener(event.toLowerCase(), callback, false);
  }

  public static removeNativeEventListener(event: any, callback: any) {
    // @ts-ignore
    window[event] = new Event(event.toLowerCase());

    window.removeEventListener(event.toLowerCase(), callback, false);
  }
}

export { os };
