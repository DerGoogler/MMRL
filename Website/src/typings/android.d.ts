interface Android {
  // Root management
  exec(command: string): void;
  execResult(command: string): string;
  isAppGrantedRoot(): boolean;

  // Preference management
  setPref(key: string, value: string): void;
  getPref(key: string): string;
  removePref(key: string): void;
  clearPrefs(): void;

  // Statusbar management
  setStatusbarColor(color: string): void;
  setStatusbarBackgroundWhite(): void;

  // Storage management
  hasStoragePermission(): void;
  requestStoargePermission(): void;

  // Version managment
  getAppVersionCode(): int;
  getAppVersionName(): string;
  getAppPackageId(): string;
  getAndroidVersionCode(): int;
  getMagiskVersionCode(): string;

  // Others
  open(link: string): void;
  close(): void;
}

export default Android;
