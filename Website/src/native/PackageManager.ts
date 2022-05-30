import Shell from "@Native/ShellBuilder";
import Constants from "@Native/Constants";
import pkg from "@Package";

class PackageManager {
  public static get getAppPackageId(): string {
    if (Constants.isAndroid) {
      return nversion.getAppPackageId();
    } else {
      return pkg.name;
    }
  }

  public static get getAppVersionName(): string {
    if (Constants.isAndroid) {
      return nversion.getAppVersionName();
    } else {
      return pkg.version;
    }
  }

  public static get getAppVersionCode(): int {
    if (Constants.isAndroid) {
      return nversion.getAppVersionCode();
    } else {
      return Number(pkg.versionCode);
    }
  }

  public static get getMagiskVersionCode(): number {
    if (Constants.isAndroid) {
      return parseInt(Shell.cmd("su -V").result());
    } else {
      return 0;
    }
  }
  public static get getMagiskVersionName(): string {
    if (Constants.isAndroid) {
      return Shell.cmd("su -v").result();
    } else {
      return "0:MAGISKSU";
    }
  }
  public static parseMagisk(version: string): number {
    const i = version.indexOf(".");
    if (i == -1) {
      return parseInt(version);
    } else {
      return parseInt(version.substring(0, i)) * 1000 + parseInt(version.substring(i + 1)) * 100;
    }
  }
}

export default PackageManager;
