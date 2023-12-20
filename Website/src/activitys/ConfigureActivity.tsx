import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ConfigureView } from "@Components/ConfigureView";
import { PreviewErrorBoundary } from "./PlaygroundsActivity";
import { useModConf } from "@Hooks/useModConf";

type Extra = {
  raw_data?: string;
  modulename: string;
  moduleid: string;
};

const ConfigureActivity = () => {
  const { modConf } = useModConf();
  const { context, extra } = useActivity<Extra>();

  const config: string = React.useMemo(() => {
    if (!extra.raw_data) {
      const file = new SuFile(modConf("CONFINDEX", { MODID: extra.moduleid }));

      if (file.exist()) {
        return file.read();
      } else {
        return `<p>Config file not found</p>`;
      }
    } else {
      return extra.raw_data;
    }
  }, []);

  return (
    <PreviewErrorBoundary modid={extra.moduleid} children={config} renderElement={ConfigureView} />
  );
};

export { ConfigureActivity };
