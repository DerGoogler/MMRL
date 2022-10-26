import {ShellConstructor} from './Shell';
import SuFile from './SuFile';

export interface MagiskModuleProps extends Object {
  id: string;
  name: string;
  version: string;
  versionCode: string;
  author: string;
  description: string;
  updateJson?: string;
  support?: string;
  donate?: string;
  minMagisk?: string;
  minApi?: string;
  maxApi?: string;
}

export class MagiskConstructor extends ShellConstructor {
  /**
   * Available paths/folder
   * - `.magisk`
   * - `busybox`
   * - `modules`
   * - `config`
   * - `mirror`
   * - `block`
   * - `rootdor`
   */
  public readonly MAGISKBASE: string;
  public readonly MAGISKTMP: string;
  public readonly SECURE_DIR: string;
  public readonly MAGISKDB: string;
  public readonly DATABIN: string;
  public readonly HAS_MAGISK: boolean;
  public readonly VERSION_CODE: number;

  public constructor() {
    super();
    const SBIN = new SuFile('/sbin/magisk');
    const SYSTEM = new SuFile('/system/bin/magisk');
    const SYSTEM_EX = new SuFile('/system/xbin/magisk');

    this.MAGISKBASE = this.result('magisk --path');
    this.MAGISKTMP = `${this.MAGISKBASE}/.magisk`;
    this.SECURE_DIR = '/data/adb';
    this.MAGISKDB = `${this.SECURE_DIR}/magisk.db`;
    this.DATABIN = `${this.SECURE_DIR}/magisk`;
    this.HAS_MAGISK = SBIN.exist() || SYSTEM.exist() || SYSTEM_EX.exist();
    this.VERSION_CODE = Number(this.result('magisk -V'));
  }

  public readModuleProps(folder: string): MagiskModuleProps {
    const read = new SuFile(`${this.SECURE_DIR}/modules/${folder}/module.prop`);
    return this._readProps<MagiskModuleProps>(read.read());
  }

  public disableModule(folder: string) {
    return new SuFile(`${this.SECURE_DIR}/modules/${folder}/disable`);
  }

  public removeModule(folder: string) {
    return new SuFile(`${this.SECURE_DIR}/modules/${folder}/remove`);
  }

  private _readProps<T = {}>(data: string): T {
    const format = data // split the data by line
      .split('\n')
      // split each row into key and property
      .map(row => row.split('='))
      // use reduce to assign key-value pairs to a new object
      // using Array.prototype.reduce
      // @ts-ignore
      .reduce((acc, [key, value]) => ((acc[key] = value), acc), {});
    return format as T;
  }
}

export const Magisk: MagiskConstructor = new MagiskConstructor();
