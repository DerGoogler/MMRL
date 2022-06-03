import BuildConfig from "./BuildConfig";

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
  public static readonly isAndroid_A12 = os.isAndroid && BuildConfig.VERSION.SDK_INT > 31;
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
}

export default os;
