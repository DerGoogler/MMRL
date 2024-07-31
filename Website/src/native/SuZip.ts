import { Native } from "./Native";
import { WasmFs } from "@wasmer/wasmfs";

export const wasmFs = new WasmFs();

export type SuZipConstuctor = new (zipFile: string, path: string) => SuZip;

export interface NativeSuZip {
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
 * @implements {NativeSuZip}
 */
class SuZip extends Native<NativeSuZip> {
  // @ts-ignore - Won't get even called
  private _zipFile: ReturnType<NativeSuZip["newFS"]>;
  private _zipFilePath: string;
  private _path: string;

  public constructor(zipFile: string, path: string) {
    super(window.__suzip__);
    this._zipFilePath = zipFile;
    this._path = path;
    if (this.isAndroid) {
      this._zipFile = this.interface.newFS.bind(this.interface)(zipFile);
    }
  }

  public getZipPath(): string {
    return this._zipFilePath;
  }

  public getPath(): string {
    return this._path;
  }

  public read(): string {
    if (this.isAndroid) {
      return this._zipFile.read(this._path);
    }
    return "";
  }

  public list(): Array<string> {
    if (this.isAndroid) {
      return this._zipFile.list().split(",");
    }
    return [""];
  }

  public exist(): boolean {
    if (this.isAndroid) {
      return this._zipFile.exists(this._path);
    }
    return false;
  }

  public isFile(): boolean {
    if (this.isAndroid) {
      return this._zipFile.isFile(this._path);
    }
    return false;
  }

  public isDirectory(): boolean {
    if (this.isAndroid) {
      return this._zipFile.isDirectory(this._path);
    }
    return false;
  }

  public static read(zipPath: string, path: string) {
    return new SuZip(zipPath, path).read();
  }

  public static list(zipPath: string) {
    return new SuZip(zipPath, "").list();
  }

  public static exist(zipPath: string, path: string) {
    return new SuZip(zipPath, path).exist();
  }

  public static isFile(zipPath: string, path: string) {
    return new SuZip(zipPath, path).isFile();
  }

  public static isDirectory(zipPath: string, path: string) {
    return new SuZip(zipPath, path).isDirectory();
  }
}

export { SuZip };
