import Constants from "@Native/Constants";

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

  /** Returns the current value associated with the given key, or null if the given key does not exist. */ // @ts-ignore
  public getPref(key: string): string | null | undefined {
    if (Constants.isAndroid) {
      const get = android.getPref(key);
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
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public setPref(key: string, value: string): void {
    if (Constants.isAndroid) {
      android.setPref(key, value);
    } else {
      this.webStorage.setItem(key, value);
    }
  }
  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    if (Constants.isAndroid) {
      android.removePref(key);
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
      android.clearPrefs();
    } else {
      this.webStorage.clear();
    }
  }

  [name: string]: any;
}

export default SharedPreferences;
