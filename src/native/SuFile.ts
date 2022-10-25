import {NativeModules} from 'react-native';

const {SuFileModule} = NativeModules;

export default class SuFile {
  private _file: string;
  private _module: typeof SuFileModule;

  public constructor(file: string) {
    this._module = SuFileModule;
    this._file = file;
  }

  public read(): string {
    return this._module.readFile(this._file);
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

  public getExternalStorageDir(): string {
    return this._module.getExternalStorageDir();
  }

  public getPackageDataDir(): string {
    return this._module.getPackageDataDir();
  }

  public getPublicDir(type: string): string {
    return this._module.getPublicDir(type);
  }

  public getDataDir(): string {
    return this._module.getDataDir();
  }
}
