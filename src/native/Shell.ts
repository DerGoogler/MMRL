import {NativeModules, DeviceEventEmitter} from 'react-native';

export class ShellConstructor {
  private _module: any;

  public constructor() {
    this._module = NativeModules.SuperUserModule;
  }

  public exec(command: string): void {
    this._module.exec(command);
  }

  public execWithEvent(command: string, callback?: () => void): void {
    if (callback) {
      this._module.execWithEvent(command, callback);
    } else {
      this._module.execWithEvent(command, () => {});
    }
  }

  public addEventListener(callback: (result: string) => void): void {
    DeviceEventEmitter.addListener('onShell', callback);
  }

  public result(command: string): string {
    return this._module.result(command);
  }

  public isAppGrantedRoot(): boolean {
    return this._module.isAppGrantedRoot();
  }
}

export const Shell: ShellConstructor = new ShellConstructor();
