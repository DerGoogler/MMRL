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
    lastModified(): number;
    create(type: number): boolean;
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
  // @ts-ignore - Won't get even called
  private _file: ReturnType<NativeSuFile["v2"]>;
  private _path: string;
  private _imgblob: string | ArrayBuffer | null = null;

  /**
   * @returns `0` as number to create a new file
   */
  public static readonly NEW_FILE: number = 0;
  /**
   * @returns `1` as number to create a new folder with parent folders
   */
  public static readonly NEW_FOLDERS: number = 1;
  /**
   * @returns `2` as number to create a new folder
   */
  public static readonly NEW_FOLDER: number = 2;

  public constructor(path?: string) {
    super(window.__sufile__);

    if (typeof path !== "string") throw new TypeError("Path name isn't a string");

    this._path = path;
    if (this.isAndroid) {
      this._file = this.interface.v2.bind(this.interface)(path);
    }
  }

  public read(): string {
    if (this.isAndroid) {
      return this._file.read();
    } else {
      return localStorage.getItem(this._path) || "";
    }
  }

  public readAsDataURL(type: string) {
    const fileReader = new FileReader();
    const imgBlob = new Blob([this.read()], { type: type });
    fileReader.readAsDataURL(imgBlob);
    fileReader.onload = (e) => {
      if (e.target) {
        this._imgblob = e.target.result;
      }
    };
    return this._imgblob;
  }

  public write(content: string): void {
    if (this.isAndroid) {
      this._file.write(content);
    } else {
      localStorage.setItem(this._path, content);
    }
  }

  public list(delimiter: string = ","): Array<string> {
    if (this.isAndroid) {
      return this._file.list(delimiter).split(delimiter);
    } else {
      return [""];
    }
  }

  public lastModified(): number {
    if (this.isAndroid) {
      return this._file.lastModified();
    } else {
      return 0;
    }
  }

  public exist(): boolean {
    if (this.isAndroid) {
      return this._file.exists();
    } else {
      return this._path in localStorage;
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
  /**
   * Creates a new file or folder
   * ```
   * SuFile.NEW_FILE
   * SuFile.NEW_FOLDER
   * SuFile.NEW_FOLDERS
   * ```
   * @param type
   * @default SuFile.NEW_FILE
   * @returns {boolean}
   */
  public create(type: number = SuFile.NEW_FILE): boolean {
    if (this.isAndroid) {
      return this._file.create(type);
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

  public static create(path: string, type: number = SuFile.NEW_FILE): boolean {
    return new SuFile(path).create(type);
  }
}

export { SuFile };
