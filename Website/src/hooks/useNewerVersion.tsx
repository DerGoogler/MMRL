export const useNewerVersion = (oldVer: VersionType, newVer: VersionType) => {
  const oldParts = oldVer.split(".");
  const newParts = newVer.split(".");
  for (var i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    if (a > b) return true;
    if (a < b) return false;
  }
  return false;
};
