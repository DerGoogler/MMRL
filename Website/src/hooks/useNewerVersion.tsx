import { BuildConfig } from "@Native/BuildConfig";

export const useNewerVersion = (ver: VersionType) => {
  const oldParts = BuildConfig.VERSION_NAME.split(".");
  const newParts = ver.split(".");
  for (var i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
};
