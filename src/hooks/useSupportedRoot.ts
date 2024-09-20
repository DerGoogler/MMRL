import { Shell } from "@Native/Shell";
import React from "react";
import { valid, satisfies } from "semver";

const currentRootVersion = Shell.VERSION_NAME();
const rootManager = Shell.getRootManagerV2().toLowerCase();

const useSupportedRoot = (roots: Module["root"], deps: React.DependencyList): [boolean, string] => {
  const cleanSemver = React.useCallback((version: string) => {
    return version.replace(/:.*$/, "");
  }, deps);

  const isSupported = React.useMemo(() => {
    if (!roots) {
      return true;
    }

    if (roots[rootManager]) {
      const cleanedVer = cleanSemver(currentRootVersion);
      if (valid(cleanedVer)) {
        return satisfies(cleanedVer, roots[rootManager]);
      }
    }

    return true;
  }, deps);

  return [isSupported, currentRootVersion];
};

export { useSupportedRoot };
