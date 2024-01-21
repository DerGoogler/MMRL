import { os } from "@Native/Os";
import { SuFile } from "@Native/SuFile";
import { Properties } from "properties-file";
import React from "react";
import { useModConf } from "./useModConf";
import { useSettings } from "./useSettings";

export function useLocalModules() {
  const { modConf } = useModConf();
  const { settings } = useSettings();
  const [localModules, setLocalModules] = React.useState<Module[]>([]);

  if (os.isAndroid) {
    React.useEffect(() => {
      const folders = SuFile.list(modConf("MODULES"));
      folders.forEach((module) => {
        const properties = new SuFile(modConf("PROPS", { MODID: module }));
        if (properties.exist()) {
          setLocalModules((prev) => {
            // Preventing duplicates
            const ids = new Set(prev.map((d) => d.id));
            const merged = [
              ...prev,
              ...[
                {
                  ...(new Properties(properties.read()).toObject() as unknown as Module),
                  timestamp: properties.lastModified(),
                  __mmrl__local__module__: true,
                },
              ].filter((d) => !ids.has(d.id)),
            ];
            return merged;
          });
        }
      });
    }, [settings]);
  }

  return localModules;
}
