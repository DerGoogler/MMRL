import {NativeModules} from 'react-native';

export class ShellConstructor {
  private _module: any;

  public constructor() {
    this._module = NativeModules.SuperUserModule;
  }

  public exec(command: string): void {
    this._module.exec(command);
  }

  public result(command: string): string {
    return this._module.result(command);
  }

  public isAppGrantedRoot(): boolean {
    return this._module.isAppGrantedRoot();
  }
}

export const Shell: ShellConstructor = new ShellConstructor();
