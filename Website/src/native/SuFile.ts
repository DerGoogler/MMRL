import { IFs } from "memfs";
import { Native } from "./Native";
import { WasmFs } from "@wasmer/wasmfs";

export const wasmFs = new WasmFs();

interface NativeSuFile {
  readFile(path: string): string;
  listFiles(path: string): string;
  createFile(path: string): boolean;
  deleteFile(path: string): boolean;
  deleteRecursive(path: string): boolean;
  existFile(path: string): boolean;
}

/**
 * Class to read files on a native Android device
 * @implements {NativeSuFile}
 */
class SuFile extends Native<NativeSuFile> {
  private path: string;
  private _fs: IFs = wasmFs.fs;

  public constructor(path?: string) {
    super();
    this.path = path ? path : "";
    this.interfaceName = "__sufile__";
    // Support for browsers
    // if (!this.isAndroid) {
    //   this._fs = null as unknown as IFs;
    // }
  }

  public read(): string {
    if (this.isAndroid) {
      return this.getInterface.readFile(this.path);
    } else {
      return this._fs.readFileSync(this.path).toString();
    }
  }

  public write(content: string): void {
    if (this.isAndroid) {
      null;
    } else {
      this._fs.writeFileSync(this.path, content);
    }
  }

  /**
   * @description
   * ```js
   * new File("").list().split(",");
   * ```
   */
  public list(): string;
  public list(join?: string): string {
    if (this.isAndroid) {
      return this.getInterface.listFiles(this.path);
    } else {
      return "";
    }
  }

  public exist(): boolean {
    if (this.isAndroid) {
      return this.getInterface.existFile(this.path);
    } else {
      return this._fs.existsSync(this.path);
    }
  }

  public delete(): boolean {
    if (this.isAndroid) {
      return this.getInterface.deleteFile(this.path);
    } else {
      return false;
    }
  }

  public deleteRecursive(): void {
    if (this.isAndroid) {
      this.getInterface.deleteRecursive(this.path);
    }
  }

  public create(): boolean {
    if (this.isAndroid) {
      return this.getInterface.createFile(this.path);
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

  /**
   *
   * @param path
   * @description
   * ```js
   * File.list("").split(",");
   * ```
   */
  public static list(path: string): string {
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
