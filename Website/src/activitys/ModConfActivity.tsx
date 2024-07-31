import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ModConfView } from "@Components/ModConfView";
import { useModFS } from "@Hooks/useModFS";
import { PreviewErrorBoundary } from "./ModConfPlaygroundActivity";
import { SuZip } from "@Native/SuZip";

export interface ModConfActivityExtra {
  /**
   * ## This field only applies to ModConf Standalone
   */
  index?: string;
  cwd?: string;
  standaloneFile?: string;
  modId: string;
}

const ModConfActivity = () => {
  const { modFS } = useModFS();
  const { extra } = useActivity<ModConfActivityExtra>();

  const config: string = React.useMemo(() => {
    const notFound = 'import {Page} from "@mmrl/ui";export default () => <Page>Config file not found</Page>';

    if (!extra.standaloneFile) {
      const file = new SuFile(modFS("CONFINDEX", { MODID: extra.modId }));
      if (file.exist()) {
        return file.read();
      } else {
        return notFound;
      }
    } else {
      const file = new SuZip(modFS("MCALONEFILE", { MODID: extra.modId }), extra.index || "/index.jsx");
      if (file.exist()) {
        return file.read();
      } else {
        return notFound;
      }
    }
  }, []);

  return (
    <PreviewErrorBoundary>
      <ModConfView standaloneFile={extra.standaloneFile} cwd={extra.cwd} index={extra.index} modid={extra.modId} children={config} />
    </PreviewErrorBoundary>
  );
};

export { ModConfActivity };
