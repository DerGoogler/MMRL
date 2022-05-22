import Logger from "../utils/Logger";

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 */
class PreferencesManager {
  /** Returns the number of key/value pairs. */
  public readonly length: number | undefined;
  private webStorage: Storage;
  private log: Logger;

  public constructor() {
    this.log = new Logger(this.constructor.name);
    this.webStorage = localStorage;
  }

  /** Returns the current value associated with the given key, or null if the given key does not exist. */
  public getPref(key: string): string | null {
    this.log.info(`Requested ${key}`);
    return this.webStorage.getItem(key);
  }
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public setPref(key: string, value: string): void {
    // Never display the preference value!
    this.log.info(`Save preference key ${key} with an value`);
    this.webStorage.setItem(key, value);
  }
  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    this.log.info(`${key} was removed`);
    this.webStorage.removeItem(key);
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public clearPrefs(): void {
    this.log.info("Preverences has been cleared");
    this.webStorage.clear();
  }

  [name: string]: any;
}

export default PreferencesManager;
