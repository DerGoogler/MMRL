// import { Logger } from "googlers-tools";

import { os } from "./Os";

/**
 * Custom logger for MMRL with Native Android logging support. It also support React/JSX element.
 */
class Log /*extends Logger*/ {
  private tag: string;
  public constructor(tag: string) {
    //super(tag);
    this.tag = tag;
  }

  public i(message: any) {
    if (os.isAndroid) {
      nos.logi(this.tag, message);
    } else {
      console.info(message);
    }
  }

  public w(message: any) {
    if (os.isAndroid) {
      nos.logw(this.tag, message);
    } else {
      console.warn(message);
    }
  }

  public e(message: any) {
    if (os.isAndroid) {
      nos.loge(this.tag, message);
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

export default Log;
