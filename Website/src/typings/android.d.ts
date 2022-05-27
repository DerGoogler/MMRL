interface Android {
  // Root management
  exec(command: string): void;
  execResult(command: string): string;
  cppExecResult(command: string): string;
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
  hasStoragePermission(): boolean;
  requestStoargePermission(): void;

  // Version managment
  getAppVersionCode(): int;
  getAppVersionName(): string;
  getAppPackageId(): string;
  getAndroidVersionCode(): int;
  /**
   * @deprecated
   */
  getMagiskVersionCode(): string;

  // Link
  open(link: string): void;
  downloadFile(urlStr: string, output: string): void;

  // Storage
  getDataDir(): string;
  readModules(): string;
  readFile(path: string): string;
  suReadFile(path: string): string;

  // Others
  close(): void;
  makeToast(content: string, duration: int): void;
  log(TAG: string, message: string): void;
}

export default Android;
