import Constants from "@Native/Constants";

class Log {
  private tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  public i(message: string) {
    if (Constants.isAndroid) {
      nos.log(this.tag, message);
    } else {
      console.info(`%c[${this.tag}]`, "color: #0693e3", message);
    }
  }

  public w(message: string) {
    if (Constants.isAndroid) {
      nos.log(this.tag, message);
    } else {
      console.info(`%c[${this.tag}]`, "color: orange", message);
    }
  }

  public e(message: string) {
    if (Constants.isAndroid) {
      nos.log(this.tag, message);
    } else {
      console.info(`%c[${this.tag}]`, "color: #d44950", message);
    }
  }

  public static i(tag: string, message: string) {
    if (Constants.isAndroid) {
      nos.log(tag, message);
    } else {
      console.info(`%c[${tag}]`, "color: #0693e3", message);
    }
  }

  public static w(tag: string, message: string) {
    if (Constants.isAndroid) {
      nos.log(tag, message);
    } else {
      console.info(`%c[${tag}]`, "color: orange", message);
    }
  }

  public static e(tag: string, message: string) {
    if (Constants.isAndroid) {
      nos.log(tag, message);
    } else {
      console.info(`%c[${tag}]`, "color: #d44950", message);
    }
  }
}

export default Log;
