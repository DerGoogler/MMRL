import { IFs } from "memfs";
import { Native } from "./Native";
import { WasmFs } from "@wasmer/wasmfs";

export const wasmFs = new WasmFs();

interface NativeSuFile extends NativeSuFileV2 {
  readFile(path: string): string;
  listFiles(path: string): string;
  createFile(path: string): boolean;
  deleteFile(path: string): boolean;
  deleteRecursive(path: string): boolean;
  existFile(path: string): boolean;
}

interface NativeSuFileV2 {
  v2(path: string): {
    write(data: string): void;
    read(): string;
    list(delimiter: string | null): string;
    create(): boolean;
    delete(): boolean;
    deleteRecursive(): void;
    exists(): boolean;
  };
}

/**
 * Class to read files on a native Android device
 * @implements {NativeSuFile}
 */
class SuFile extends Native<NativeSuFile> {
  private _file: ReturnType<NativeSuFile["v2"]>;
  private _fs: IFs = wasmFs.fs;
  private _path: string;

  public constructor(path?: string) {
    super();

    if (typeof path !== "string") throw new TypeError("Path name isn't a string");

    this.interfaceName = "__sufile__";
    this._path = path;
    this._file = (window.__sufile__ as NativeSuFile).v2(path);
  }

  public read(): string {
    if (this.isAndroid) {
      return this._file.read();
    } else {
      return this._fs.readFileSync(this._path).toString();
    }
  }

  public write(content: string): void {
    if (this.isAndroid) {
      this._file.write(content);
    } else {
      this._fs.writeFileSync(this._path, content);
    }
  }

  public list(delimiter: string = ","): Array<string> {
    if (this.isAndroid) {
      return this._file.list(delimiter).split(delimiter);
    } else {
      return [""];
    }
  }

  public exist(): boolean {
    if (this.isAndroid) {
      return this._file.exists();
    } else {
      return this._fs.existsSync(this._path);
    }
  }

  public delete(): boolean {
    if (this.isAndroid) {
      return this._file.delete();
    } else {
      return false;
    }
  }

  public deleteRecursive(): void {
    if (this.isAndroid) {
      this._file.deleteRecursive();
    }
  }

  public create(): boolean {
    if (this.isAndroid) {
      return this._file.create();
    } else {
      return false;
    }
  }

  public static read(path: string): string {
    return new SuFile(path).read();
  }

  public static write(path: string, content: string): void {
    new SuFile(path).write(content);
  }

  public static list(path: string): Array<string> {
    return new SuFile(path).list();
  }

  public static exist(path: string): boolean {
    return new SuFile(path).exist();
  }

  public static delete(path: string): boolean {
    return new SuFile(path).delete();
  }

  public static deleteRecursive(path: string): void {
    new SuFile(path).deleteRecursive();
  }

  public static create(path: string): boolean {
    return new SuFile(path).create();
  }
}

export { SuFile };
