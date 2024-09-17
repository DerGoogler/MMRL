import { path } from "@Util/path";
import { Native } from "./Native";
import { fs } from "@zenfs/core";

interface NativeSuFile extends NativeSuFileV2 {
  readFile(path: string): string;
  listFiles(path: string): string;
  createFile(path: string): boolean;
  deleteFile(path: string): boolean;
  deleteRecursive(path: string): boolean;
  existFile(path: string): boolean;
  getSharedFile(): string | null;
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
    _can_TypeMethod(type: number): boolean;
    setExecuteWriteReadable(type: number, state: boolean, ownerOnly: boolean): boolean;
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
  // @ts-ignore - Won't get even called
  private _bfile: typeof fs;
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

  public static TYPE = class {
    public static readonly ISFILE = 0;
    public static readonly ISSYMLINK = 1;
    public static readonly ISDIRECTORY = 2;
    public static readonly ISBLOCK = 3;
    public static readonly ISCHARACTER = 4;
    public static readonly ISNAMEDPIPE = 5;
    public static readonly ISSOCKET = 6;
    public static readonly ISHIDDEN = 7;

    public static readonly CANREAD = 0;
    public static readonly CANWRITE = 1;
    public static readonly CANEXECUTE = 2;
  };

  private _restrictedPaths = [/(\/data\/data\/(.+)\/?|(\/storage\/emulated\/0|\/sdcard)\/Android\/(data|media|obb)(.+)?)\/?/i];

  public constructor(path?: string, opt?: SuFileoptions) {
    super(window.__sufile__);
    this._readDefaultValue = opt?.readDefaultValue || "";
    this._path = path ? String(path) : "";

    if (this._isRestrictedPath(this._path)) {
      throw new Error(`SuFile tried to access "${path}" which has been blocked due security.`);
    }

    if (this.isAndroid) {
      this._file = this.interface.v2.bind(this.interface)(this._path);
    } else {
      this._bfile = fs;
    }
  }

  private _isRestrictedPath(path: string): boolean {
    return this._restrictedPaths.some((restrictedPath) => restrictedPath.test(path));
  }

  public retrictedPaths(newPaths: RegExp[]) {
    // run typo checks
    for (const path of newPaths) {
      if (!(path instanceof RegExp)) {
        throw new TypeError(String(path) + " is not a regular expression");
      }
    }

    this._restrictedPaths = [...this._restrictedPaths, ...newPaths];
  }

  public getPath(): string {
    return this._path;
  }

  public read(): string {
    if (this.isAndroid) {
      return this._file.read(this._readDefaultValue);
    } else {
      return this._bfile.readFileSync(this._path, "utf-8") || this._readDefaultValue;
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
      this._bfile.writeFileSync(this._path, content);
    }
  }

  public list(delimiter: string = ","): Array<string> {
    if (this.isAndroid) {
      return this._file.list(delimiter).split(delimiter);
    } else {
      return this._bfile.readdirSync(this._path);
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
      return this._bfile.existsSync(this._path);
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
    } else {
      this._bfile.rmSync(this._path, { recursive: true });
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
      switch (type) {
        case SuFile.NEW_FILE:
          this._bfile.writeFileSync(this._path, "");
          break;
        case SuFile.NEW_FOLDER:
          this._bfile.mkdirSync(this._path);
          break;
        case SuFile.NEW_FOLDERS:
          this._bfile.mkdirSync(this._path, { recursive: true });
          break;
        default:
          return true;
      }

      return true;
    }
  }

  private _isTypeMethod(type: number, defR: boolean = false) {
    if (typeof type !== "number") throw new TypeError("'SuFile' => '_isTypeMethod' only accepts numbers as type");

    if (this.isAndroid) {
      return this._file._is_TypeMethod(type);
    }

    return defR;
  }

  private _canTypeMethod(type: number, defR: boolean = false): boolean {
    if (typeof type !== "number") throw new TypeError("'SuFile' => '_canTypeMethod' only accepts numbers as type");

    if (this.isAndroid) {
      return this._file._can_TypeMethod(type);
    }

    return defR;
  }

  private _setExecuteWriteReadable(type: number, state: boolean, ownerOnly: boolean, defR: boolean = false): boolean {
    if (typeof type !== "number") throw new TypeError("'SuFile' => '_canTypeMethod' only accepts numbers as type");

    if (this.isAndroid) {
      return this._file.setExecuteWriteReadable(type, state, ownerOnly);
    }

    return defR;
  }

  public canRead(): boolean {
    return this._canTypeMethod(SuFile.TYPE.CANREAD);
  }

  public canWrite(): boolean {
    return this._canTypeMethod(SuFile.TYPE.CANWRITE);
  }

  public canExecute(): boolean {
    return this._canTypeMethod(SuFile.TYPE.CANEXECUTE);
  }

  public setExecuteable(executable: boolean, ownerOnly: boolean = true) {
    return this._setExecuteWriteReadable(SuFile.TYPE.CANEXECUTE, executable, ownerOnly);
  }

  public setWriteable(writeable: boolean, ownerOnly: boolean = true) {
    return this._setExecuteWriteReadable(SuFile.TYPE.CANWRITE, writeable, ownerOnly);
  }

  public setReadable(readable: boolean, ownerOnly: boolean = true) {
    return this._setExecuteWriteReadable(SuFile.TYPE.CANREAD, readable, ownerOnly);
  }

  public isFile(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISFILE, this._path in localStorage);
  }

  public isSymlink(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISSYMLINK);
  }

  public isDirectory(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISDIRECTORY);
  }

  public isBlock(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISBLOCK);
  }

  public isCharacter(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISCHARACTER);
  }

  public isNamedPipe(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISNAMEDPIPE);
  }

  public isSocket(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISSOCKET);
  }

  public isHidden(): boolean {
    return this._isTypeMethod(SuFile.TYPE.ISHIDDEN);
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

  public static getSharedFile(): string | undefined {
    if (this.isAndroid) {
      return this.static.interface.getSharedFile();
    }
    return undefined;
  }

  public static createFileTree(fileTree: object, basePath: string) {
    Object.keys(fileTree).forEach((key) => {
      const value = fileTree[key];
      const fullPath = path.join(basePath, key.replace(/^\//, "")); // Remove leading '/' if present

      if (typeof value === "object") {
        // If value is an object, create a directory
        if (!SuFile.exist(fullPath)) {
          SuFile.create(fullPath, SuFile.NEW_FOLDERS);
        }
        // Recursively create subdirectories and files
        this.createFileTree(value, fullPath);
      } else if (typeof value === "string") {
        // If value is a string, treat it as file content
        SuFile.write(fullPath, value);
      }
    });
  }
}

export { SuFile };
