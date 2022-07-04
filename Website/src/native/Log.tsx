import { os } from "./os";
import console from "react-console";

class Log {
  private tag: string;

  public constructor(tag: string) {
    this.tag = tag;
  }

  public i<T = string>(message: T | T[]) {
    if (os.isAndroid) {
      nos.logi<T>(this.tag, message);
    } else {
      console.info(
        //@ts-ignore
        <div>
          <strong style={{ color: "#0693e3" }}>{`[${this.tag}] `}</strong>
          {message}
        </div>
      );
    }
  }

  public w<T = string>(message: T | T[]) {
    if (os.isAndroid) {
      nos.logw(this.tag, message);
    } else {
      console.info(
        //@ts-ignore
        <div>
          <strong style={{ color: "orange" }}>{`[${this.tag}] `}</strong>
          {message}
        </div>
      );
    }
  }

  public e<T = string>(message: T | T[]) {
    if (os.isAndroid) {
      nos.loge(this.tag, message);
    } else {
      console.info(
        //@ts-ignore
        <div>
          <strong style={{ color: "#d44950" }}>{`[${this.tag}] `}</strong>
          {message}
        </div>
      );
    }
  }

  public static i<T>(tag: string, message: T | T[]) {
    new Log(tag).i<T>(message);
  }

  public static w<T>(tag: string, message: T | T[]) {
    new Log(tag).w<T>(message);
  }

  public static e<T>(tag: string, message: T | T[]) {
    new Log(tag).e<T>(message);
  }
}

export default Log;
