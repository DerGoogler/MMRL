import { Native } from "./Native";

/**
 * Custom logger for MMRL with Native Android logging support. It also support React/JSX element.
 */
class Log extends Native {
  private tag: string;
  public constructor(tag: string) {
    super();
    this.tag = tag;
    this.interfaceName = "__os__";
  }

  public i(message: any) {
    if (this.isAndroid) {
      this.getInterface.logi(this.tag, message);
    } else {
      console.info(message);
    }
  }

  public w(message: any) {
    if (this.isAndroid) {
      this.getInterface.logw(this.tag, message);
    } else {
      console.warn(message);
    }
  }

  public e(message: any) {
    if (this.isAndroid) {
      this.getInterface.loge(this.tag, message);
    } else {
      console.error(message);
    }
  }

  public static i<T>(tag: string, message: any) {
    new Log(tag).i(message);
  }

  public static w(tag: string, message: any) {
    new Log(tag).w(message);
  }

  public static e(tag: string, message: any) {
    new Log(tag).e(message);
  }
}

export { Log };
