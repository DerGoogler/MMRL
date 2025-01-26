import { NativeProperty } from "../decorators/NativeProperty";
import { MMRLObjectAccessor } from "./MMRLObjectAccessor";

class VersionInterface extends MMRLObjectAccessor<MMRL> {
  public constructor() {
    super(window["mmrl"] as object);
  }

  /**
   * @public
   * @readonly
   */
  @NativeProperty({
    default: {
      applicationId: "",
      versionName: "",
      versionCode: 0,
      buildType: "",
      isDevVersion: false,
      isGooglePlayBuild: false,
    },
  })
  public readonly app = {
    applicationId: this.interface.getBuildConfig().getApplicationId(),
    versionName: this.interface.getBuildConfig().getVersionName(),
    versionCode: this.interface.getBuildConfig().getVersionCode(),
    buildType: this.interface.getBuildConfig().getBuildType(),
    isDevVersion: this.interface.getBuildConfig().isDevVersion(),
    isGooglePlayBuild: this.interface.getBuildConfig().isGooglePlayBuild(),
  };

  /**
   * @public
   * @readonly
   */
  @NativeProperty({
    default: {
      platform: "",
      versionName: "",
      versionCode: 0,
    },
  })
  public readonly root = {
    platform: this.interface.getRootConfig().getPlatform(),
    versionName: this.interface.getRootConfig().getVersionName(),
    versionCode: this.interface.getRootConfig().getVersionCode(),
  };
}

export const mmrl = new VersionInterface();
