import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Ansi from "ansi-to-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Shell } from "@Native/Shell";
import { useSettings } from "@Hooks/useSettings";
import { BuildConfig } from "@Native/BuildConfig";
import { useModConf } from "@Hooks/useModConf";

const TerminalActivity = () => {
  const { context, extra } = useActivity<any>();
  const { settings } = useSettings();
  const { modConf, __modConf } = useModConf();
  const [active, setActive] = React.useState<bool>(true);

  const [lines, setLines] = React.useState<string[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

  const termEndRef = React.useRef<HTMLDivElement>(null);
  const addLine = (line: string) => {
    setLines((lines) => [...lines, line]);
  };

  if (settings.term_scroll_bottom) {
    const termBehavior = React.useMemo(() => settings.term_scroll_behavior, [settings]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const install = () => {
    const { exploreInstall, path, id } = extra;

    if (exploreInstall) {
      const envp_explore = {
        MMRL: "true",
        MMRL_VER: BuildConfig.VERSION_CODE.toString(),
        NAME: id,
        URL: path,
        ROOTMANAGER: Shell.getRootManager(),
        ...__modConf,
      };

      Terminal.exec({
        command: `${modConf("MMRLINI")}/system/usr/share/mmrl/bin/mmrl_explore_install_v4`,
        env: envp_explore,
        onLine: (line) => {
          addLine(line);
        },
        onExit: (code) => {
          if (code) {
            setActive(false);
          }
        },
      });
    } else {
      const envp_local = {
        MMRL: "true",
        MMRL_VER: BuildConfig.VERSION_CODE.toString(),
        NAME: id,
        ZIPFILE: path,
        ROOTMANAGER: Shell.getRootManager(),
        ...__modConf,
      };

      Terminal.exec({
        command: `${modConf("MMRLINI")}/system/usr/share/mmrl/bin/mmrl_local_install_v4`,
        env: envp_local,
        onLine: (line) => {
          addLine(line);
        },
        onExit: (code) => {
          if (code) {
            setActive(false);
          }
        },
      });
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>{!active && <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />}</Toolbar.Left>
        <Toolbar.Center>Install</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page
      onDeviceBackButton={(e) => {
        if (!active) {
          e.callParentHandler();
        }
      }}
      onShow={install}
      modifier="noshadow"
      renderToolbar={renderToolbar}
      backgroundStyle="#000000"
    >
      <div
        ref={ref}
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          style={{
            whiteSpace: "pre",
            flex: "0 0 100%",
            backgroundColor: "black",
            color: "white",
            height: "100%",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          {lines.map((line) => (
            <StyledItem>{line}</StyledItem>
          ))}
        </Stack>
      </div>
      <div ref={termEndRef} />
    </Page>
  );
};

const StyledItem = styled(Ansi)((theme) => ({
  marginLeft: 8,
  marginRight: 8,
}));

export default TerminalActivity;
