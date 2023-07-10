import { Native } from "./Native";

class SystemPropertiesClass extends Native {
  private readonly PROP_NAME_MAX: number = 31;
  private readonly PROP_VALUE_MAX: number = 91;

  public constructor() {
    super();
    this.interfaceName = "__properties__";
  }

  public get(key: string, def?: string): string {
    if (key.length > this.PROP_NAME_MAX) {
      throw new Error("key.length > " + this.PROP_NAME_MAX);
    }
    return this.getInterface.get(key, def ? def : "");
  }
}

export const SystemProperties = new SystemPropertiesClass();

