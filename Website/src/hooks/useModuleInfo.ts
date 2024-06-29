type PickedModule =
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
  | "readme";

/**
 * Used to handle undefined properties
 */
export const useModuleInfo = (extra: Module): Pick<Module, PickedModule> => {
  const { track } = extra;

  return {
    // timestamp: extra.timestamp || extra.versions.pop()?.timestamp,
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
  };
};
