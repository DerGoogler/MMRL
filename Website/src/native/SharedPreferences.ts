import Constants from "@Native/Constants";
import { os } from "./os";

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 */
class SharedPreferences {
  /** Returns the number of key/value pairs. */
  public readonly length: number | undefined;
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
  public getString(key: string, defValue: string): string | String {
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
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a boolean.
   *
   * @throws ClassCastException
   */
  public getBoolean(key: string, defValue: bool): boolean | Boolean {
    if (os.isAndroid) {
      return nsharedpreferences.getBoolean(key, defValue);
    } else {
      const get = this.webStorage.getItem(key);
      if (get === null) {
        return defValue;
      } else {
        return Boolean(get);
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
  public getInt(key: string, defValue: int): number | Number {
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

  /**
   * @deprecated
   */
  public setPref(key: string, value: string): void {
    if (Constants.isAndroid) {
      nsharedpreferences.setPref(key, value);
    } else {
      this.webStorage.setItem(key, value);
    }
  }

  /**
   * @deprecated
   */
  public getPref(key: string): string | null | undefined {
    if (Constants.isAndroid) {
      const get = nsharedpreferences.getPref(key);
      if (get === undefined || get === null || get === "") {
        return undefined;
      } else {
        return get;
      }
    } else {
      const get = this.webStorage.getItem(key);
      if (get === undefined || get === null || get === "") {
        return undefined;
      } else {
        return get;
      }
    }
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    if (Constants.isAndroid) {
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
    if (Constants.isAndroid) {
      nsharedpreferences.clearPrefs();
    } else {
      this.webStorage.clear();
    }
  }

  [name: string]: any;
}

export default SharedPreferences;
