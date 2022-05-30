interface FileSystem {
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
}

export default FileSystem;
