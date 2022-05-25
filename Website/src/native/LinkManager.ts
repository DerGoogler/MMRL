import Constants from "./Constants";

class LinkManager {
  public static open(link: string, target?: string): void {
    if (Constants.isAndroid) {
      android.open(link);
    } else {
      window.open(link, target);
    }
  }
}

export default LinkManager;
