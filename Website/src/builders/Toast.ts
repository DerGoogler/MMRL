import Constants from "@Native/Constants";

class Toast {
  public static readonly LENGTH_LONG: int = 1;
  public static readonly LENGTH_SHORT: int = 0;
  private static duration: int;
  private static text: string;

  public static makeText(text: string, duration: int): Toast {
    this.text = text;
    this.duration = duration;
    return new this();
  }

  public show(): void {
    if (Constants.isAndroid) {
      android.makeToast(Toast.text, Toast.duration);
    }
  }
}

export default Toast;
