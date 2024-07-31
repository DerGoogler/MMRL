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
    read(def: string): string;
    readAsBase64(): string;
    list(delimiter: string | null): string;
    lastModified(): number;
    create(type: number): boolean;
    delete(): boolean;
    deleteRecursive(): void;
    exists(): boolean;
    _is_TypeMethod(type: number): boolean;
  };
}

export interface SuFileoptions {
  /**
   * This should be always a string
   */
  readDefaultValue: string;
}

export type SuFileConstuctor = new (path: string) => SuFile;

/**
 * Class to read files on a native Android device
 * @implements {NativeSuFile}
 */
class SuFile extends Native<NativeSuFile> {
  // @ts-ignore - Won't get even called
  private _file: ReturnType<NativeSuFile["v2"]>;
  private _path: string;
  private _imgblob: string | ArrayBuffer | null = null;
  private _readDefaultValue: string;

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

  public static readonly TYPE_ISFILE = 0;
  public static readonly TYPE_ISSYMLINK = 1;
  public static readonly TYPE_ISDIRECTORY = 2;
  public static readonly TYPE_ISBLOCK = 3;
  public static readonly TYPE_ISCHARACTER = 4;
  public static readonly TYPE_ISNAMEDPIPE = 5;
  public static readonly TYPE_ISSOCKET = 6;
  public static readonly TYPE_ISHIDDEN = 7;

  public constructor(path: string, opt?: SuFileoptions) {
    super(window.__sufile__);
    this._readDefaultValue = opt?.readDefaultValue || "";

    if (typeof path !== "string") throw new TypeError("Path name isn't a string");

    this._path = path;
    if (this.isAndroid) {
      this._file = this.interface.v2.bind(this.interface)(path);
    }
  }

  public getPath(): string {
    return this._path;
  }

  public read(): string {
    if (this.isAndroid) {
      return this._file.read(this._readDefaultValue);
    } else {
      return localStorage.getItem(this._path) || this._readDefaultValue;
    }
  }

  public readAsBase64() {
    if (this.isAndroid) {
      return this._file.readAsBase64();
    } else {
      return "";
    }
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

  private _isTypeMethod(type: number, defR: boolean = false) {
    if (typeof type !== "number") throw new TypeError("'SuFile' => 'isTypeMethod' only accepts numbers as type");

    if (this.isAndroid) {
      return this._file._is_TypeMethod(type);
    } else {
      return defR;
    }
  }

  public isFile(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISFILE, this._path in localStorage);
  }

  public isSymlink(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISSYMLINK);
  }

  public isDirectory(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISDIRECTORY);
  }

  public isBlock(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISBLOCK);
  }

  public isCharacter(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISCHARACTER);
  }

  public isNamedPipe(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISNAMEDPIPE);
  }

  public isSocket(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISSOCKET);
  }

  public isHidden(): boolean {
    return this._isTypeMethod(SuFile.TYPE_ISHIDDEN);
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
