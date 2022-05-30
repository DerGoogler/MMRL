interface NVersion {
  getAppVersionCode(): int;
  getAppVersionName(): string;
  getAppPackageId(): string;
  getAndroidVersionCode(): int;
}

export default NVersion;
