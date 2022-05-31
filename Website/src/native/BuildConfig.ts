import Shell from "@Native/ShellBuilder";
import Constants from "@Native/Constants";
import pkg from "@Package";

class BuildConfig {
  public static get APPLICATION_ID(): string {
    if (Constants.isAndroid) {
      return nbuildconfig.APPLICATION_ID();
    } else {
      return pkg.name;
    }
  }

  public static get VERSION_NAME(): string {
    if (Constants.isAndroid) {
      return nbuildconfig.VERSION_NAME();
    } else {
      return pkg.version;
    }
  }

  public static get VERSION_CODE(): int {
    if (Constants.isAndroid) {
      return nbuildconfig.VERSION_CODE();
    } else {
      return Number(pkg.versionCode);
    }
  }

  public static readonly VERSION = {
    get SDK_INT(): int {
      if (Constants.isAndroid) {
        return nbuildconfig.SDK_INT();
      } else {
        return 0;
      }
    },
  };

  public static readonly MAGISK = {
    get VERSION_CODE(): number {
      if (Constants.isAndroid) {
        return parseInt(Shell.cmd("su -V").result());
      } else {
        return 0;
      }
    },
    get VERSION_NAME(): string {
      if (Constants.isAndroid) {
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
}

export default BuildConfig;