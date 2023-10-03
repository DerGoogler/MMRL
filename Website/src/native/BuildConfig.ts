import pkg from "@Package";
import { Native } from "./Native";

/**
 * BuildConfigs for Android
 */
class BuildConfigClass extends Native {
  public constructor() {
    super();
    this.interfaceName = "__buildconfig__";
  }

  public get BUILD_DATE(): number {
    if (this.isAndroid) {
      return this.getInterface.BUILD_DATE();
    } else {
      return WEB_BUILD_DATE;
    }
  }

  public get VERSION_NAME(): VersionType {
    if (this.isAndroid) {
      return this.getInterface.VERSION_NAME();
    } else {
      return pkg.config.version_name as VersionType;
    }
  }

  public get VERSION_CODE(): number {
    if (this.isAndroid) {
      return this.getInterface.VERSION_CODE();
    } else {
      return pkg.config.version_code;
    }
  }

  public get APPLICATION_ID(): string {
    if (this.isAndroid) {
      return this.getInterface.APPLICATION_ID();
    } else {
      return pkg.name;
    }
  }
  public get DEBUG(): boolean {
    if (this.isAndroid) {
      return this.getInterface.DEBUG;
    } else {
      return __webpack__mode__ === "development";
    }
  }

  public get BUILD_TYPE(): string {
    if (this.isAndroid) {
      return this.getInterface.BUILD_TYPE;
    } else {
      return "unknown";
    }
  }
}

export const BuildConfig: BuildConfigClass = new BuildConfigClass();
