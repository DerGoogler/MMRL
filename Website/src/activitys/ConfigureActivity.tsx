import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useStrings } from "@Hooks/useStrings";
import React from "react";
import { SuFile } from "@Native/SuFile";
import { useLog } from "@Hooks/native/useLog";
import { useTheme } from "@Hooks/useTheme";
import { useSettings } from "@Hooks/useSettings";
import { ConfigureView } from "@Components/ConfigureView";

type Extra = {
  raw_data?: string;
  modulename: string;
  moduleid: string;
};

const ConfigureActivity = () => {
  const log = useLog("ConfigureActivity");
  const { strings } = useStrings();
  const { settings, modConf } = useSettings();
  const { theme } = useTheme();
  const { context, extra } = useActivity<Extra>();

  const config: string = React.useMemo(() => {
    if (!extra.raw_data) {
      const file = new SuFile(modConf("CONFIG", { MODID: extra.moduleid }));

      if (file.exist()) {
        return file.read();
      } else {
        return `<p>Config file not found</p>`;
      }
    } else {
      return extra.raw_data;
    }
  }, []);

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.BackButton onClick={context.popPage} />
        </Toolbar.Left>
        <Toolbar.Center>Configure {extra.modulename}</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page renderToolbar={renderToolbar}>
      <ConfigureView modid={extra.moduleid}>{config}</ConfigureView>
    </Page>
  );
};

export { ConfigureActivity };
