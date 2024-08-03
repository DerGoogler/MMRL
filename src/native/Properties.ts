import { Native } from "./Native";
import { Shell } from "./Shell";

interface IProperties {
  get(key: string, def: string): string;
  set(key: string, val: string): void;
}

class PropertiesClass extends Native<IProperties> {
  public constructor() {
    super(null as any);
  }

  public get(key: string, def: string): string {
    if (this.isAndroid) {
      return Shell.cmd(`getprop "${key}" "${def}"`).result();
    } else {
      return window.localStorage.getItem(key) || def;
    }
  }

  public set(key: string, value: string): void {
    if (this.isAndroid) {
      Shell.cmd(`setprop "${key}" "${value}"`).exec();
    } else {
      return window.localStorage.setItem(key, value);
    }
  }
}

export const Properties = new PropertiesClass();
