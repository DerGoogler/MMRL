interface NSharedPreferences {
  /**
   * @deprecated
   */
  setPref(key: string, value: string): void;
  /**
   * @deprecated
   */
  getPref(key: string): string;
  setString(key: string, value: string): void;
  setBoolean(key: string, value: bool): void;
  setInt(key: string, value: int): void;
  getString(key: string, defValue: string): string;
  getBoolean(key: string, defValue: boolean): boolean;
  getInt(key: string, defValue: int): int;
  removePref(key: string): void;
  clearPrefs(): void;
}

export default NSharedPreferences;
