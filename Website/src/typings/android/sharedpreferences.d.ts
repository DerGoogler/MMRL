interface NSharedPreferences {
  setPref(key: string, value: string): void;
  getPref(key: string): string;
  removePref(key: string): void;
  clearPrefs(): void;
}

export default NSharedPreferences;
