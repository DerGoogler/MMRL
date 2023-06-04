import { os } from "./os";
import Shell from "@Native/Shell";
import pkg from "@Package";

/**
 * BuildConfigs for Android
 */
class BuildConfig {
  public static get APPLICATION_ID(): string {
    if (os.isAndroid) {
      return nbuildconfig.APPLICATION_ID();
    } else {
      return pkg.name;
    }
  }

  public static get VERSION_NAME(): string {
    if (os.isAndroid) {
      return nbuildconfig.VERSION_NAME();
    } else {
      return pkg.version;
    }
  }

  public static get VERSION_CODE(): int {
    if (os.isAndroid) {
      return nbuildconfig.VERSION_CODE();
    } else {
      return Number(pkg.versionCode);
    }
  }

  public static readonly VERSION = {
    /**
     * @deprecated
     */
    get SDK_INT(): int {
      if (os.isAndroid) {
        return nbuildconfig.SDK_INT();
      } else {
        return 0;
      }
    },
  };
}

export default BuildConfig;
