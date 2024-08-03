import React from "react";

type PickedModule =
  | "timestamp"
  | "verified"
  | "license"
  | "homepage"
  | "support"
  | "donate"
  | "cover"
  | "icon"
  | "require"
  | "screenshots"
  | "categories"
  | "readme"
  | "size";

type ModuleInfo = Pick<Module, PickedModule> & { latestVersion: Version };

/**
 * Used to handle undefined properties
 */
export const useModuleInfo = (extra: Module): ModuleInfo => {
  const { track } = extra;

  const latestVersion = React.useMemo(() => extra.versions[extra.versions.length - 1], [extra.versions]);

  return {
    timestamp: extra.timestamp || latestVersion.timestamp,
    verified: extra.verified,
    license: extra.license || track.license,
    homepage: extra.homepage || track.homepage,
    support: extra.support || track.support,
    donate: extra.donate || track.donate,
    cover: extra.cover || track.cover,
    icon: extra.icon || track.icon,
    require: extra.require || track.require,
    screenshots: extra.screenshots || track.screenshots,
    categories: extra.categories || track.categories,
    readme: extra.readme || track.readme,
    latestVersion: latestVersion,
    size: extra.size || latestVersion.size,
  };
};
