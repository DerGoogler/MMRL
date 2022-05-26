import Shell from "@Builders/ShellBuilder";
import Constants from "@Native/Constants";

class LinkManager {
  public static open(link: string, target?: string): void {
    if (Constants.isAndroid) {
      android.open(link);
    } else {
      window.open(link, target);
    }
  }
  public static downloadFile(url: string, output: string): void {
    if (Constants.isAndroid) {
      android.downloadFile(url, output);
    } else {
      window.open(url, "_parent");
    }
  }
}

export default LinkManager;
