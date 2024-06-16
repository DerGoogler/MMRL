import { Native } from "./Native";

type SuccessCallback = (file: string[] | "RESULT_CANCELED") => void;
type ErrorCallback = ((code: number) => void) | null;

interface ChooserNative {
  getFile(type: string, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
}

class Chooser extends Native<ChooserNative> {
  public type: string;
  private _onChose: SuccessCallback | undefined;
  private _onError: ErrorCallback = null;

  public constructor(type: string) {
    super(window.__chooser__);

    if (typeof type !== "string") throw new TypeError("Chooser plugin only accepts 'string' as type");

    this.type = type;
  }

  public set onChose(func: SuccessCallback) {
    this._onChose = func;
  }

  public set onError(func: ErrorCallback) {
    this._onError = func;
  }

  public static isSuccess(arg: string[] | "RESULT_CANCELED") {
    return arg !== "RESULT_CANCELED";
  }

  public getFiles() {
    if (this.isAndroid) {
      if (typeof this._onChose !== "function") throw new TypeError("Chooser 'onChose' is not a function");

      this.interface.getFile(this.type, this._onChose, this._onError);
    }
  }
}

export { Chooser };
