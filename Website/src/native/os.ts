import Constants from "./Constants";

class os {
  public static getSchemeParam(param: string): string {
    if (Constants.isAndroid) {
      return nos.getSchemeParam(param);
    } else {
      param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
      var regex = new RegExp("[?&]" + param + "=([^&#]*)");
      var url = decodeURIComponent(window.location.href);
      var match = regex.exec(url);
      return match ? match[1] : "";
    }
  }

  public static hasStoragePermission(): boolean {
    return nos.hasStoragePermission();
  }

  public static requestStoargePermission(): void {
    nos.requestStoargePermission();
  }

  public static close(): void {
    nos.close();
  }

  public static open(link: string): void {
    nos.open(link);
  }
}

export default os;
