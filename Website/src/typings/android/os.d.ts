interface NOS {
  makeToast(content: string, duration: int): void;
  log(tag: string, message: string): void;
  getSchemeParam(param: string): string;
  hasStoragePermission(): bool;
  requestStoargePermission(): void;
  open(link: string): void;
  close(): void;
  isPackageInstalled(targetPackage: string): bool;
  launchAppByPackageName(targetPackage: string): void;
  getMonetColor(id: string): string;
}

export default NOS;
