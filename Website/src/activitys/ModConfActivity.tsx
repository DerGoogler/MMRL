import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ModConfView } from "@Components/ModConfView";
import { useModFS } from "@Hooks/useModFS";
import { PreviewErrorBoundary } from "./ModConfPlaygroundActivity";

type Extra = {
  code?: string;
  modulename: string;
  moduleid: string;
};

const ModConfActivity = () => {
  const { modFS } = useModFS();
  const { extra } = useActivity<Extra>();

  const config: string = React.useMemo(() => {
    if (!extra.code) {
      const file = new SuFile(modFS("CONFINDEX", { MODID: extra.moduleid }));

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
      <ModConfView modid={extra.moduleid} children={config} />
    </PreviewErrorBoundary>
  );
};

export { ModConfActivity };
