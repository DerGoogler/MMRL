import Constants from "./Constants";

class PackageManager {
  public static get getAppPackageId(): string {
    if (Constants.isAndroid) {
      return android.getAppPackageId();
    } else {
      return "com.dergoogler.mmrl.web";
    }
  }

  public static get getAppVersionName(): string {
    if (Constants.isAndroid) {
      return android.getAppVersionName();
    } else {
      return "1";
    }
  }

  public static get getAppVersionCode(): int {
    if (Constants.isAndroid) {
      return android.getAppVersionCode();
    } else {
      return 0;
    }
  }

  public static get getMagiskVersionCode(): string {
    if (Constants.isAndroid) {
      return android.getMagiskVersionCode();
    } else {
      return "0";
    }
  }
}

export default PackageManager;
