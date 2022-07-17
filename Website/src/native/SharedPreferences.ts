import { util } from "googlers-tools";
import { os } from "./os";

export interface ISharedPreferences {
  setString(key: string, value: string): void;
  setBoolean(key: string, value: bool): void;
  setInt(key: string, value: int): void;
  setJSON<T = any>(key: string, value: T): void;
  getString(key: string, defValue: string): string;
  getBoolean(key: string, defValue: boolean): boolean;
  getInt(key: string, defValue: int): int;
  getJSON<T = any>(key: string, defValue: T): T;
  removePref(key: string): void;
  clearPrefs(): void;
}

declare const nsharedpreferences: Record<string, (...args: any) => any>;

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 */
class SharedPreferences implements ISharedPreferences {
  private webStorage: Storage;

  public constructor() {
    this.webStorage = localStorage;
  }

  public setString(key: string, value: string): void {
    if (os.isAndroid) {
      nsharedpreferences.setString(key, value);
    } else {
      this.webStorage.setItem(key, String(value));
    }
  }

  public setBoolean(key: string, value: bool): void {
    if (os.isAndroid) {
      nsharedpreferences.setBoolean(key, value);
    } else {
      this.webStorage.setItem(key, String(value));
    }
  }

  public setInt(key: string, value: int): void {
    if (os.isAndroid) {
      nsharedpreferences.setInt(key, value);
    } else {
      this.webStorage.setItem(key, String(value));
    }
  }

  public setJSON<T = any>(key: string, value: T): void {
    if (os.isAndroid) {
      nsharedpreferences.setInt(key, JSON.stringify(value));
    } else {
      this.webStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Retrieve a String value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @encode The `defValue` should also encoded
   *
   * @return Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a String.
   *
   * @throws ClassCastException
   */
  public getString(key: string, defValue: string): string {
    if (os.isAndroid) {
      return nsharedpreferences.getString(key, defValue);
    } else {
      const get = this.webStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return String(get);
      }
    }
  }

  /**
   * Retrieve a boolean value from the preferences.
   *
   * @remember if it's from an Switch or Select, put `_switch` or `_select` after the name
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a boolean.
   *
   * @throws ClassCastException
   */
  public getBoolean(key: string, defValue: bool): boolean {
    if (os.isAndroid) {
      return nsharedpreferences.getBoolean(key, defValue);
    } else {
      const get = this.webStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return util.stringToBoolean(get);
      }
    }
  }

  /**
   * Retrieve a int value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not an int.
   *
   * @throws ClassCastException
   */
  public getInt(key: string, defValue: int): number {
    if (os.isAndroid) {
      return nsharedpreferences.getInt(key, defValue);
    } else {
      const get = this.webStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return Number(get);
      }
    }
  }

  public getJSON<T = any>(key: string, defValue: T): T {
    if (os.isAndroid) {
      return JSON.parse(nsharedpreferences.getInt(key, JSON.stringify(defValue)));
    } else {
      const get = this.webStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return JSON.parse(get);
      }
    }
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    if (os.isAndroid) {
      nsharedpreferences.removePref(key);
    } else {
      this.webStorage.removeItem(key);
    }
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public clearPrefs(): void {
    if (os.isAndroid) {
      nsharedpreferences.clearPrefs();
    } else {
      this.webStorage.clear();
    }
  }

  [name: string]: any;

  // Statics

  private static s: ISharedPreferences = new this();

  public static setString(key: string, value: string): void {
    this.s.setString(key, value);
  }

  public static setBoolean(key: string, value: bool): void {
    this.s.setBoolean(key, value);
  }

  public static setInt(key: string, value: int): void {
    this.s.setInt(key, value);
  }

  /**
   * Retrieve a String value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @return Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a String.
   *
   * @throws ClassCastException
   */
  public static getString(key: string, defValue: string): string {
    return this.s.getString(key, defValue);
  }

  /**
   * Retrieve a boolean value from the preferences.
   *
   * @remember if it's from an Switch or Select, put `_switch` or `_select` after the name
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a boolean.
   *
   * @throws ClassCastException
   */
  public static getBoolean(key: string, defValue: bool): boolean {
    return this.s.getBoolean(key, defValue);
  }

  /**
   * Retrieve a int value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not an int.
   *
   * @throws ClassCastException
   */
  public static getInt(key: string, defValue: int): number {
    return this.s.getInt(key, defValue);
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public static removePref(key: string): void {
    this.s.removePref(key);
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public static clearPrefs(): void {
    this.s.clearPrefs();
  }

  static [name: string]: any;
}

export default SharedPreferences;
