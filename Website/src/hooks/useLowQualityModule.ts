import { useMemo } from "react";

export const useLowQualityModule = (props: ModuleProps) => {
  const requiredProp = ["id", "name", "version", "versionCode", "author", "description"];

  const res = useMemo(
    () =>
      requiredProp.reduce(function (i, j) {
        return i && props[j] && j in props;
      }, true),
    [props]
  );

  return !res;
};
