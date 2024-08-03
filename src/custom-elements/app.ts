import { BuildConfig } from "@Native/BuildConfig";

export class MMRLApp extends HTMLElement {
  public constructor() {
    super();
    this.initConfigStats([
      {
        key: "package",
        value: BuildConfig.APPLICATION_ID,
      },
      {
        key: "version-name",
        value: BuildConfig.VERSION_NAME,
      },
      {
        key: "version-code",
        value: BuildConfig.VERSION_CODE,
      },
      {
        key: "debug",
        value: BuildConfig.DEBUG,
      },
      {
        key: "build-type",
        value: BuildConfig.BUILD_TYPE,
      },
    ]);
  }

  private initConfigStats(data: any) {
    return data.map((element: { key: string; value: any }) => {
      return this.set(element.key, element.value);
    });
  }

  private set(qualifiedName: string, value: string) {
    this.setAttribute(qualifiedName, value);
  }
}
