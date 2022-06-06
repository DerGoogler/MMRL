interface NOS {
  makeToast(content: string, duration: int): void;
  getSchemeParam(param: string): string;
  hasStoragePermission(): bool;
  requestStoargePermission(): void;
  open(link: string): void;
  close(): void;
  isPackageInstalled(targetPackage: string): bool;
  launchAppByPackageName(targetPackage: string): void;
  getMonetColor(id: string): string;
  getColorRes(id: string): string;
  setStatusbarColor(color: string, white?: bool): void;
  /**
   * @deprecated 
   */
  log(tag: string, message: string): void;
  logi(tag: string, message: string): void;
  logw(tag: string, message: string): void;
  loge(tag: string, message: string): void;
}

export default NOS;
