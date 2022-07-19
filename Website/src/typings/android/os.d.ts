interface NOS {
  makeToast(content: string | undefined, duration: int| undefined): void;
  getSchemeParam(param: string): string;
  hasStoragePermission(): bool;
  requestStoargePermission(): void;
  open(link: string): void;
  close(): void;
  isPackageInstalled(targetPackage: string): bool;
  launchAppByPackageName(targetPackage: string): void;
  getMonetColor(id: string): string;
  getColorRes(id: string): string;
  setStatusBarColor(color: string, white?: bool): void;
  setNavigationBarColor(color: string): void;
  /**
   * @deprecated
   */
  log(tag: string, message: string): void;
  logi<T>(tag: string, message: T | T[]): void;
  logw<T>(tag: string, message: T | T[]): void;
  loge<T>(tag: string, message: T | T[]): void;
}

export default NOS;
