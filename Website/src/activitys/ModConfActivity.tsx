import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ModConfView } from "@Components/ModConfView";
import { useModFS } from "@Hooks/useModFS";
import { PreviewErrorBoundary } from "./ModConfPlaygroundActivity";
import { ZipFS } from "@Native/ZipFS";

const ModConfActivity = () => {
  const { modFS } = useModFS();
  const { extra } = useActivity<{ standaloneFile?: string; children: string; modId: string }>();

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
      const file = new ZipFS(modFS("MCALONEFILE", { MODID: extra.modId }), "/src/index.jsx");
      if (file.exist()) {
        return file.read();
      } else {
        return notFound;
      }
    }
  }, []);

  return (
    <PreviewErrorBoundary>
      <ModConfView standaloneFile={extra.standaloneFile} modid={extra.modId} children={config} />
    </PreviewErrorBoundary>
  );
};

export { ModConfActivity };
