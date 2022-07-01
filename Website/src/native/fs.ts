export interface IFileSystem {
  readFile(path: string): string;
  listFiles(path: string): string;
  existFile(path: string): boolean;
  deleteFile(path: string): boolean;
  deleteRecursive(path: string): void;
  createFile(path: string): boolean;
  getExternalStorageDir(): string;
  getPackageDataDir(): string;
  getPublicDir(type: string): string;
  getDataDir(): string;
  download(output: string, path: string): void;
}

declare const nfs: IFileSystem;

/**
 * Nothing
 */
class fs implements IFileSystem {
  private path: string;
  public constructor(path?: string) {
    this.path = path ? path : "";
  }

  public readFile(): string {
    return nfs.readFile(this.path);
  }

  /**
   * @description
   * ```js
   * new fs("").listFiles().split(",");
   * ```
   */
  public listFiles(): string {
    return nfs.listFiles(this.path);
  }

  public existFile(): boolean {
    return nfs.existFile(this.path);
  }

  public deleteFile(): boolean {
    return nfs.deleteFile(this.path);
  }

  public deleteRecursive(): void {
    nfs.deleteRecursive(this.path);
  }

  public createFile(): boolean {
    return nfs.createFile(this.path);
  }

  public getExternalStorageDir(): string {
    return nfs.getExternalStorageDir();
  }

  public getPackageDataDir(): string {
    return nfs.getPackageDataDir();
  }

  public getPublicDir(type: string): string {
    return nfs.getPublicDir(type);
  }

  public getDataDir(): string {
    return nfs.getDataDir();
  }

  public download(url: string): void {
    return nfs.download(this.path, url);
  }

  public static readFile(path: string): string {
    return new fs(path).readFile();
  }

  /**
   *
   * @param path
   * @description
   * ```js
   * fs.listFiles("").split(",");
   * ```
   */
  public static listFiles(path: string): string {
    return new fs(path).listFiles();
  }

  public static existFile(path: string): boolean {
    return new fs(path).existFile();
  }

  public static deleteFile(path: string): boolean {
    return new fs(path).deleteFile();
  }

  public static deleteRecursive(path: string): void {
    new fs(path).deleteRecursive();
  }

  public static createFile(path: string): boolean {
    return new fs(path).createFile();
  }

  public static getExternalStorageDir(): string {
    return new fs().getExternalStorageDir();
  }

  public static getPackageDataDir(): string {
    return new fs().getPackageDataDir();
  }

  public static getPublicDir(type: string): string {
    return new fs().getPublicDir(type);
  }

  public static getDataDir(): string {
    return new fs().getDataDir();
  }

  public static download(output: string, url: string): void {
    new fs(output).download(url);
  }
}

export default fs;
