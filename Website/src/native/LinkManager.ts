import Constants from "./Constants";

class LinkManager {
  public static open(link: string | any): void {
    if (Constants.isAndroid) {
      android.open(link);
    } else {
      window.open(link);
    }
  }
}

export default LinkManager