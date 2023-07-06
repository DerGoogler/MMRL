import ons from "onsenui";
import { os } from "./Os";

type ToastReturn = Omit<IToast, "makeText">;

interface IToast {
  /**
   * Show the view or text notification for a short period of time.
   */
  readonly LENGTH_LONG: int;

  /**
   * Show the view or text notification for a long period of time.
   */
  readonly LENGTH_SHORT: int;

  makeText(text: string, duration: int): ToastReturn;
  show(): void;
}

class ToastClass implements IToast {
  /**
   * Show the view or text notification for a short period of time.
   */
  public readonly LENGTH_LONG: int = os.isAndroid ? 1 : 5000;

  /**
   * Show the view or text notification for a long period of time.
   */
  public readonly LENGTH_SHORT: int = os.isAndroid ? 0 : 2000;
  
  private duration: int | undefined;
  private text: string | undefined;

  public makeText(text: string, duration: int): ToastReturn {
    this.text = text;
    this.duration = duration;
    return this;
  }

  public show(): void {
    if (os.isAndroid) {
      nos.makeToast(this.text, this.duration);
    } else {
      ons.notification.toast(this.text, { timeout: this.duration, animation: "fall" });
    }
  }
}

const Toast: IToast = new ToastClass();

export default Toast;
export { ToastClass, IToast };
