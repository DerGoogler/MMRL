/**
 * Nothing
 */
class fs {
  private path: string;
  public constructor(path: string) {
    this.path = path;
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

  public static readFile(path: string): string {
    return nfs.readFile(path);
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
    return nfs.listFiles(path);
  }

  public static existFile(path: string): boolean {
    return nfs.existFile(path);
  }

  public static deleteFile(path: string): boolean {
    return nfs.deleteFile(path);
  }

  public static deleteRecursive(path: string): void {
    nfs.deleteRecursive(path);
  }

  public static createFile(path: string): boolean {
    return nfs.createFile(path);
  }

  public static getExternalStorageDir(): string {
    return nfs.getExternalStorageDir();
  }

  public static getPackageDataDir(): string {
    return nfs.getPackageDataDir();
  }

  public static getPublicDir(type: string): string {
    return nfs.getPublicDir(type);
  }

  public static getDataDir(): string {
    return nfs.getDataDir();
  }
}

export default fs;
