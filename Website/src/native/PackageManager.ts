import Shell from "@Builders/ShellBuilder";
import Constants from "@Native/Constants";
import pkg from "@Package";

class PackageManager {
  public static get getAppPackageId(): string {
    if (Constants.isAndroid) {
      return android.getAppPackageId();
    } else {
      return pkg.name;
    }
  }

  public static get getAppVersionName(): string {
    if (Constants.isAndroid) {
      return android.getAppVersionName();
    } else {
      return pkg.version;
    }
  }

  public static get getAppVersionCode(): int {
    if (Constants.isAndroid) {
      return android.getAppVersionCode();
    } else {
      return Number(pkg.version.replace(".", ""));
    }
  }

  public static get getMagiskVersionCode(): string {
    if (Constants.isAndroid) {
      return Shell.cmd("su -V").result()
    } else {
      return "0";
    }
  } 
  public static get getMagiskVersionName(): string {
    if (Constants.isAndroid) {
      return Shell.cmd("su -v").result()
    } else {
      return "0:MAGISKSU";
    }
  }
}

export default PackageManager;
