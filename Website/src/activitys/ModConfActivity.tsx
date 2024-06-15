import { useActivity } from "@Hooks/useActivity";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { ModConfView } from "@Components/ModConfView";
import { useModFS } from "@Hooks/useModFS";
import { PreviewErrorBoundary } from "./ModConfPlaygroundActivity";

const ModConfActivity = () => {
  const { modFS } = useModFS();
  const { extra } = useActivity<{ modId: string }>();

  const config: string = React.useMemo(() => {
    const file = new SuFile(modFS("CONFINDEX", { MODID: extra.modId }));

    if (file.exist()) {
      return file.read();
    } else {
      return `export default () => <p>Config file not found</p>`;
    }
  }, []);

  return (
    <PreviewErrorBoundary>
      <ModConfView modid={extra.modId} children={config} />
    </PreviewErrorBoundary>
  );
};

export { ModConfActivity };
