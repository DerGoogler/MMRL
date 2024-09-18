import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ModConfView } from "@Activitys/ModConfActivity/components/ModConfView";
import { PreviewErrorBoundary } from "../ModConfPlaygroundActivity";

interface ModConfActivityExtra {
  /**
   * ## This field is required by ModConf
   */
  indexFile: string;
  /**
   * ## This field is required by ModConf
   */
  cwd: string;
  modId: string;
}

const ModConfActivity = () => {
  const { extra } = useActivity<ModConfActivityExtra>();

  const config: string = React.useMemo(() => {
    const notFound = 'import {Page} from "@mmrl/ui";export default () => <Page>Config file not found</Page>';

    const file = new SuFile(extra.indexFile);
    if (file.exist()) {
      return file.read();
    } else {
      return notFound;
    }
  }, []);

  return (
    <PreviewErrorBoundary>
      <ModConfView cwd={extra.cwd} indexFile={extra.indexFile} modid={extra.modId} children={config} />
    </PreviewErrorBoundary>
  );
};

export default ModConfActivity;

export { ModConfActivityExtra };
