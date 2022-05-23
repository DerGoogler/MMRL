interface Android {
  // Root management
  exex(command: string): void;
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

  // Others
  open(link: string): void;
  close(): void;
  requireSDK(): int;
}

export default Android;
