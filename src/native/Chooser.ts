import { Native } from "./Native";

type SuccessCallback = (file: (File | string)[] | "RESULT_CANCELED") => void;
type ErrorCallback = ((code: number) => void) | null;

interface ChooserNative {
  getFile(type: string, allowMulti: boolean, successCallback: SuccessCallback, errorCallback: ErrorCallback): void;
}

class Chooser extends Native<ChooserNative> {
  public type: string;
  private _onChose: SuccessCallback | undefined;
  private _onError: ErrorCallback = null;
  private _allowMultiChoose = false;
  // @ts-ignore
  private _inputElement: HTMLInputElement;

  public constructor(type: string) {
    super(window.__chooser__);

    if (typeof type !== "string") throw new TypeError("Chooser plugin only accepts 'string' as type");

    this.type = type;

    if (!this.isAndroid) {
      this._inputElement = document.createElement("input");
    }
  }

  public set allowMultiChoose(value: boolean) {
    if (typeof value !== "boolean") return;
    this._allowMultiChoose = value;
  }

  public set onChose(func: SuccessCallback) {
    this._onChose = func;
  }

  public set onError(func: ErrorCallback) {
    this._onError = func;
  }

  public static isSuccess(arg: (File | string)[] | "RESULT_CANCELED") {
    return arg !== "RESULT_CANCELED";
  }

  private async _blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.onloadend = () => resolve(reader.result?.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  public async getFiles() {
    if (this.isAndroid) {
      if (typeof this._onChose !== "function") throw new TypeError("Chooser 'onChose' is not a function");

      this.interface.getFile(this.type, this._allowMultiChoose, this._onChose, this._onError);
    } else {
      this._inputElement.type = "file";
      this._inputElement.accept = this.type;
      this._inputElement.multiple = this._allowMultiChoose;

      // Handle file selection
      this._inputElement.onchange = async (event) => {
        const files = this._inputElement.files;
        if (files && files.length > 0) {
          const fileArray: string[] = [];

          for (let i = 0; i < files.length; i++) {
            fileArray.push(await this._blobToBase64(files[i]));
          }

          if (typeof this._onChose === "function") {
            this._onChose(fileArray);
          }
        } else {
          if (typeof this._onChose === "function") {
            this._onChose("RESULT_CANCELED");
          }
        }
      };

      // Trigger the file input dialog
      this._inputElement.click();
    }
  }
}

export { Chooser };
