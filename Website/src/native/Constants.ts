import tools from "../utils/tools";

class Constants {
  private static readonly userAgentAndroid = "MMRL";
  public static readonly userAgent = window.navigator.userAgent;
  public static readonly isAndroid = this.userAgentAndroid === this.userAgent ? true : false;
  public static readonly undefined = "" || null || undefined;

  public static isAndroidIf(_if: any, _else: any) {
    if (this.isAndroid === true) {
      return _if;
    } else {
      return _else;
    }
  }

}

export default Constants;
