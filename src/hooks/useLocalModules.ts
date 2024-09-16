import { os } from "@Native/Os";
import { SuFile } from "@Native/SuFile";
import { Properties } from "properties-file";
import React from "react";
import { useModFS } from "./useModFS";

export function useLocalModules() {
  const { modFS } = useModFS();
  const [localModules, setLocalModules] = React.useState<Module[]>([]);

  if (os.isAndroid) {
    React.useEffect(() => {
      const folders = new SuFile(modFS("MODULES"));
      if (folders.exist()) {
        folders.list().forEach((module) => {
          const properties = new SuFile(modFS("PROPS", { MODID: module }));
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
      }
    }, []);
  }

  return localModules;
}
