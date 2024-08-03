import pkg from "@Package";
import { Native } from "./Native";

/**
 * BuildConfigs for Android
 */
class BuildConfigClass extends Native {
  public constructor() {
    super(window.__buildconfig__);
  }

  public get BUILD_DATE(): number {
    if (this.isAndroid) {
      return this.interface.BUILD_DATE();
    } else {
      return WEB_BUILD_DATE;
    }
  }

  public get VERSION_NAME(): VersionType {
    if (this.isAndroid) {
      return this.interface.VERSION_NAME();
    } else {
      return pkg.config.version_name as VersionType;
    }
  }

  public get VERSION_CODE(): number {
    if (this.isAndroid) {
      return this.interface.VERSION_CODE();
    } else {
      return pkg.config.version_code;
    }
  }

  public get APPLICATION_ID(): string {
    if (this.isAndroid) {
      return this.interface.APPLICATION_ID();
    } else {
      return pkg.name;
    }
  }
  public get DEBUG(): boolean {
    if (this.isAndroid) {
      return this.interface.DEBUG;
    } else {
      return __webpack__mode__ === "development";
    }
  }

  public get BUILD_TYPE(): string {
    if (this.isAndroid) {
      return this.interface.BUILD_TYPE;
    } else {
      return __webpack__mode__;
    }
  }
}

const BuildConfig: BuildConfigClass = new BuildConfigClass();
export { BuildConfig, BuildConfigClass };
