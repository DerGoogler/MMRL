import { Native } from "./Native";

export interface FileSystemNative {
  read(): string;
  list(): string;
  exist(): boolean;
  delete(): boolean;
  deleteRecursive(): void;
  create(): boolean;
  get getExternalStorageDir(): string;
  get getPackageDataDir(): string;
  getPublicDir(type: string): string;
  get getDataDir(): string;
  download(url: string): void;
}

declare const nfs: any;

/**
 * Class to read files on a native Android device
 * @implements {FileSystemNative}
 */
class File extends Native {
  private path: string | undefined;

  public constructor(path?: string | undefined) {
    super();
    this.path = path ? path : "";
    this.interfaceName = "__fs__";
  }

  public read(): string {
    return this.getInterface.readFile(this.path);
  }

  /**
   * @description
   * ```js
   * new File("").list().split(",");
   * ```
   */
  public list(): string;
  public list(join?: string): string {
    return this.getInterface.listFiles(this.path);
  }

  public exist(): boolean {
    return this.getInterface.existFile(this.path);
  }

  public delete(): boolean {
    return this.getInterface.deleteFile(this.path);
  }

  public deleteRecursive(): void {
    this.getInterface.deleteRecursive(this.path);
  }

  public create(): boolean {
    return this.getInterface.createFile(this.path);
  }

  public get getExternalStorageDir(): string {
    return this.getInterface.getExternalStorageDir();
  }

  public get getPackageDataDir(): string {
    return this.getInterface.getPackageDataDir();
  }

  public getPublicDir(type: string): string {
    return this.getInterface.getPublicDir(type);
  }

  public get getDataDir(): string {
    return this.getInterface.getDataDir();
  }

  public download(url: string): void {
    return this.getInterface.download(this.path, url);
  }

  public static read(path: string): string {
    return new File(path).read();
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
    return new File(path).list();
  }

  public static exist(path: string): boolean {
    return new File(path).exist();
  }

  public static delete(path: string): boolean {
    return new File(path).delete();
  }

  public static deleteRecursive(path: string): void {
    new File(path).deleteRecursive();
  }

  public static create(path: string): boolean {
    return new File(path).create();
  }

  public static get getExternalStorageDir(): string {
    return new File().getExternalStorageDir;
  }

  public static get getPackageDataDir(): string {
    return new File().getPackageDataDir;
  }

  public static getPublicDir(type: string): string {
    return new File().getPublicDir(type);
  }

  public static get getDataDir(): string {
    return new File().getDataDir;
  }

  public static download(output: string, url: string): void {
    new File(output).download(url);
  }
}

export default File;
