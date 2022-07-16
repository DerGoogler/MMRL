import Constants from "@Native/Constants";
import ons from "onsenui";
import { os } from "./os";

class Toast {
  /**
   * Show the view or text notification for a short period of time.
   */
  public static readonly LENGTH_LONG: int = os.isAndroid ? 1 : 5000;

  /**
   * Show the view or text notification for a long period of time.
   */
  public static readonly LENGTH_SHORT: int = os.isAndroid ? 0 : 2000;
  private static duration: int;
  private static text: string;

  public static makeText(text: string, duration: int): Toast {
    this.text = text;
    this.duration = duration;
    return new this();
  }

  public show(): void {
    if (os.isAndroid) {
      nos.makeToast(Toast.text, Toast.duration);
    } else {
      ons.notification.toast(Toast.text, { timeout: Toast.duration, animation: "fall" });
    }
  }
}

export default Toast;
