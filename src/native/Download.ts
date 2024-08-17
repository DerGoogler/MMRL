import { Native } from "./Native";

type DownloadState = { type: "downloading"; state: number } | { type: "finished"; state: null };

interface DownloadStart {
  url: string;
  dest: string;
  onChange: ((s: DownloadState) => void) | undefined;
  onError?: ((err: string) => void) | null;
}

interface DownloadNative {
  start(options: DownloadStart): void;
}

class Download extends Native<DownloadNative> {
  private _onError: ((err: string) => void) | null | undefined;
  private _onChange: ((s: DownloadState) => void) | undefined;
  private _dest: string;
  private _url: string;

  public constructor(url: string, dest: string) {
    super(window.__download__);
    this._url = url;
    this._dest = dest;
  }

  public set onChange(func: DownloadStart["onChange"]) {
    this._onChange = func;
  }

  public set onError(func: DownloadStart["onError"]) {
    this._onError = func;
  }

  public start(): void {
    if (this.isAndroid) {
      if (typeof this._onChange !== "function") throw new TypeError("Download 'onChange' is not a function");

      this.interface.start({
        url: this._url,
        dest: this._dest,
        onChange: this._onChange,
        onError: this._onError,
      });
    }
  }
}

export { Download };
