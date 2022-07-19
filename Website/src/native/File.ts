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
class File implements FileSystemNative {
  private path: string | undefined;

  public constructor(path?: string | undefined) {
    this.path = path ? path : "";
  }

  public read(): string {
    return nfs.readFile(this.path);
  }

  /**
   * @description
   * ```js
   * new File("").list().split(",");
   * ```
   */
  public list(): string;
  public list(join?: string): string {
    return nfs.listFiles(this.path);
  }

  public exist(): boolean {
    return nfs.existFile(this.path);
  }

  public delete(): boolean {
    return nfs.deleteFile(this.path);
  }

  public deleteRecursive(): void {
    nfs.deleteRecursive(this.path);
  }

  public create(): boolean {
    return nfs.createFile(this.path);
  }

  public get getExternalStorageDir(): string {
    return nfs.getExternalStorageDir();
  }

  public get getPackageDataDir(): string {
    return nfs.getPackageDataDir();
  }

  public getPublicDir(type: string): string {
    return nfs.getPublicDir(type);
  }

  public get getDataDir(): string {
    return nfs.getDataDir();
  }

  public download(url: string): void {
    return nfs.download(this.path, url);
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
