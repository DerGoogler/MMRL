import { os } from "./os";
import Shell from "@Native/ShellBuilder";
import pkg from "@Package";
import SharedPreferences from "./SharedPreferences";
import Build from "./Build";

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

  public static readonly MAGISK = {
    get VERSION_CODE(): number {
      if (os.isAndroid) {
        return parseInt(Shell.cmd("su -V").result());
      } else {
        return 0;
      }
    },
    get VERSION_NAME(): string {
      if (os.isAndroid) {
        return Shell.cmd("su -v").result();
      } else {
        return "0:MAGISKSU";
      }
    },
    PARSE_VERSION(version: string): number {
      const i = version.indexOf(".");
      if (i == -1) {
        return parseInt(version);
      } else {
        return parseInt(version.substring(0, i)) * 1000 + parseInt(version.substring(i + 1)) * 100;
      }
    },
  };

  public static readonly isMonetEnabled: boolean =
    os.isAndroid && SharedPreferences.getBoolean("enableMonet", false) && BuildConfig.VERSION.SDK_INT > Build.VERSION_CODES.S
      ? true
      : false;
}

export default BuildConfig;
