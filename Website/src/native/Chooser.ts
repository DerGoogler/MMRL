import { Native } from "./Native";

type SuccessCallback = (file: string[] | "RESULT_CANCELED") => void;
type ErrorCallback = ((code: number) => void) | null;

interface ChooserNative {
  getFile(type: string, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
}

class Chooser extends Native<ChooserNative> {
  public type: string;

  public constructor(type: string) {
    super(window.__chooser__);

    if (typeof type !== "string") throw new TypeError("Chooser plugin only accepts 'string' as type");

    this.type = type;
  }

  public getFile(successCallback: SuccessCallback, errorCallback: ErrorCallback = null) {
    if (this.isAndroid) {
      this.interface.getFile(this.type, successCallback, errorCallback);
    }
  }
}

export { Chooser };
