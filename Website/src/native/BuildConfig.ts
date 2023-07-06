import pkg from "@Package";
import { Native } from "./Native";

/**
 * BuildConfigs for Android
 */
class BuildConfigClass extends Native {
  public constructor() {
    super();
    this.interface = "buildconfig";
  }

  public get APPLICATION_ID(): string {
    if (this.isAndroid) {
      return this.getInterface.APPLICATION_ID();
    } else {
      return pkg.name;
    }
  }

  public get VERSION_NAME(): string {
    if (this.isAndroid) {
      return this.getInterface.VERSION_NAME();
    } else {
      return pkg.version;
    }
  }

  public get VERSION_CODE(): int {
    if (this.isAndroid) {
      return this.getInterface.VERSION_CODE();
    } else {
      return Number(pkg.versionCode);
    }
  }
}

export const BuildConfig: BuildConfigClass = new BuildConfigClass();
