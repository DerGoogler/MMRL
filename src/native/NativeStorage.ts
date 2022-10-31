import {NativeModules} from 'react-native';

const {NativeStorageModule} = NativeModules;

export default class NativeStorage {
  private _module: any;

  /**
   * Not implemented yet
   */
  public readonly length: number = 0;

  public constructor() {
    this._module = NativeStorageModule;
  }

  public getItem(key: string): string | null {
    return this._module.getItem(key);
  }

  public setItem(key: string, value: string): void {
    return this._module.setItem(key, value);
  }

  public removeItem(key: string): void {
    this._module.removeItem(key);
  }

  public clear(): void {
    this._module.clear();
  }
}
