import { Native } from "./Native";
import { WasmFs } from "@wasmer/wasmfs";

export const wasmFs = new WasmFs();

interface NativeZipFS {
  newFS(zipFile: string): {
    list(): string;
    read(path: string): string;
    exists(path: string): boolean;
    isFile(path: string): boolean;
    isDirectory(path: string): boolean;
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
  private _path: string;

  public constructor(zipFile: string, path: string) {
    super(window.__zipfs__);
    this._zipFile = zipFile;
    this._path = path;
    if (this.isAndroid) {
      this._file = this.interface.newFS(zipFile);
    }
  }

  public getZipPath(): string {
    return this._zipFile;
  }

  public getPath(): string {
    return this._path;
  }

  public read(): string {
    if (this.isAndroid) {
      return this._file.read(this._path);
    }
    return "";
  }

  public list(): Array<string> {
    if (this.isAndroid) {
      return this._file.list().split(",");
    }
    return [""];
  }

  public exist(): boolean {
    if (this.isAndroid) {
      return this._file.exists(this._path);
    }
    return false;
  }

  public isFile(): boolean {
    if (this.isAndroid) {
      return this._file.isFile(this._path);
    }
    return false;
  }

  public isDirectory(): boolean {
    if (this.isAndroid) {
      return this._file.isDirectory(this._path);
    }
    return false;
  }

  public static read(zipPath: string, path: string) {
    return new ZipFS(zipPath, path).read();
  }

  public static list(zipPath: string) {
    return new ZipFS(zipPath, "").list();
  }

  public static exist(zipPath: string, path: string) {
    return new ZipFS(zipPath, path).exist();
  }

  public static isFile(zipPath: string, path: string) {
    return new ZipFS(zipPath, path).isFile();
  }

  public static isDirectory(zipPath: string, path: string) {
    return new ZipFS(zipPath, path).isDirectory();
  }
}

export { ZipFS };
