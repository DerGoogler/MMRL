import BuildConfig from "./BuildConfig";
import Build from "./Build";

/**
 * The `os` module provides operating system-related utility methods and
 * properties. It can be accessed using:
 *
 * ```js
 * import os from "@Native/os"
 * ```
 */
class os {
  private static readonly userAgentAndroid = "MMRL";
  public static readonly userAgent = window.navigator.userAgent;
  public static readonly isAndroid = this.userAgentAndroid === this.userAgent ? true : false;
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
    if (os.isAndroid && BuildConfig.VERSION.SDK_INT > Build.VERSION_CODES.S) {
      return nos.getMonetColor(id);
    } else {
      return fallback;
    }
  }
}

export default os;
