class Constants {
  /**
   * @deprecated
   */
  private static readonly userAgentAndroid = "MMRL";
  /**
   * @deprecated
   */
  public static readonly userAgent = window.navigator.userAgent;
  /**
   * Checks if the app is on Android
   * @deprecated
   */
  public static readonly isAndroid = this.userAgentAndroid === this.userAgent ? true : false;
  /**
   * string, null & undefined
   */
  public static readonly undefined: string | null | undefined = "" || null || undefined;

  /**
   * @deprecated
   */
  public static isAndroidIf(_if: any, _else: any) {
    if (this.isAndroid === true) {
      return _if;
    } else {
      return _else;
    }
  }
}

export default Constants;
