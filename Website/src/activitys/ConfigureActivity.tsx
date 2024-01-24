import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ConfigureView } from "@Components/ConfigureView";
import { useModConf } from "@Hooks/useModConf";
import { PreviewErrorBoundary } from "./ConfigurePlaygroundActivity";

type Extra = {
  code?: string;
  modulename: string;
  moduleid: string;
};

const ConfigureActivity = () => {
  const { modConf } = useModConf();
  const { extra } = useActivity<Extra>();

  const config: string = React.useMemo(() => {
    if (!extra.code) {
      const file = new SuFile(modConf("CONFINDEX", { MODID: extra.moduleid }));

      if (file.exist()) {
        return file.read();
      } else {
        return `<p>Config file not found</p>`;
      }
    } else {
      return extra.code;
    }
  }, []);

  return (
    <PreviewErrorBoundary>
      <ConfigureView modid={extra.moduleid} code={config} />
    </PreviewErrorBoundary>
  );
};

export { ConfigureActivity };
