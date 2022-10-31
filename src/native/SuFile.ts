import {NativeModules} from 'react-native';

const {SuFileModule} = NativeModules;

export default class SuFile {
  private _file: string;
  private _module: typeof SuFileModule;
  private static _module: typeof SuFileModule;

  public constructor(file: string) {
    this._module = SuFileModule;
    this._file = file;
    SuFile._module = SuFileModule;
  }

  public read(): string {
    return this._module.readFile(this._file, (msg: string) => {
      console.log(msg);
    });
  }

  public list(): string[] {
    return this._module.listFiles(this._file).split(',');
  }

  public create(): boolean {
    return this._module.createFile(this._file);
  }

  public delete(): boolean {
    return this._module.deleteFile(this._file);
  }

  public deleteRecursive(): void {
    this._module.deleteRecursive(this._file);
  }

  public exist(): boolean {
    return this._module.existFile(this._file);
  }

  public static getExternalStorageDir(): string {
    return this._module.getExternalStorageDir();
  }

  public static getPackageDataDir(): string {
    return this._module.getPackageDataDir();
  }

  public static getPublicDir(type: string): string {
    return this._module.getPublicDir(type);
  }

  public static getDataDir(): string {
    return this._module.getDataDir();
  }
}
