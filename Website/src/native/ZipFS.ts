import { Native } from "./Native";
import { WasmFs } from "@wasmer/wasmfs";

export const wasmFs = new WasmFs();

interface NativeZipFS {
  newFS(zipFile: string): {
    listFiles(): string;
    readFile(path: string): string;
    fileExists(path: string): boolean;
  };
}

/**
 * Class to read files on a native Android device
 * @implements {NativeZipFS}
 */
class ZipFS extends Native<NativeZipFS> {
  // @ts-ignore - Won't get even called
  private _file: ReturnType<NativeZipFS["newFS"]>;
  private _zipFile: string;

  public constructor(zipFile: string) {
    super(window.__zipfs__);
    this._zipFile = zipFile;
    if (this.isAndroid) {
      this._file = this.interface.newFS(zipFile);
    }
  }

  public getPath(): string {
    return this._zipFile;
  }

  public read(path: string): string {
    if (this.isAndroid) {
      return this._file.readFile(path);
    }
    return "";
  }

  public list(): Array<string> {
    if (this.isAndroid) {
      return this._file.listFiles().split(",");
    } else {
      return [""];
    }
  }

  public exist(path: string): boolean {
    if (this.isAndroid) {
      return this._file.fileExists(path);
    } else {
      return false;
    }
  }
}

export { ZipFS };
