import { os } from "./os";
import { Logger } from "googlers-tools";

/**
 * Custom logger for MMRL with Native Android logging support. It also support React/JSX element.
 * @extends {Logger}
 */
class Log extends Logger {
  private tag: string;
  public constructor(tag: string) {
    super(tag);
    this.tag = tag;
  }

  public i<T = string>(message: T) {
    if (os.isAndroid) {
      nos.logi<T>(this.tag, message);
    } else {
      this.info<T>(message);
    }
  }

  public w<T = string>(message: T) {
    if (os.isAndroid) {
      nos.logw(this.tag, message);
    } else {
      this.warn<T>(message);
    }
  }

  public e<T = string>(message: T) {
    if (os.isAndroid) {
      nos.loge(this.tag, message);
    } else {
      this.error<T>(message);
    }
  }

  public static i<T>(tag: string, message: T) {
    new Log(tag).i<T>(message);
  }

  public static w<T>(tag: string, message: T) {
    new Log(tag).w<T>(message);
  }

  public static e<T>(tag: string, message: T) {
    new Log(tag).e<T>(message);
  }
}

export default Log;
