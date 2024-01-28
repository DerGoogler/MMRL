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
import { useModFS } from "@Hooks/useModFS";
import { INCLUDE_CORE } from "@Util/INCLUDE_CORE";

const TerminalActivity = () => {
  const { context, extra } = useActivity<any>();
  const { settings } = useSettings();
  const { modFS, __modFS } = useModFS();
  const [active, setActive] = React.useState<bool>(true);

  const [lines, setLines] = React.useState<string[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

  const termEndRef = React.useRef<HTMLDivElement>(null);

  if (settings.term_scroll_bottom) {
    const termBehavior = React.useMemo(() => settings.term_scroll_behavior, [settings]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const processCommand = (rawCommand: string) => {
    let arg: string | any[];
    let command: string;
    console.log(rawCommand);
    const i = rawCommand.indexOf(" ");
    if (i != -1 && rawCommand.length != i + 1) {
      arg = rawCommand
        .substring(i + 1)
        .trim()
        .split(" ");
      command = rawCommand.substring(0, i);
    } else {
      arg = "";
      command = rawCommand;
    }

    switch (command) {
      case "clearTerminal":
        setLines([]);
        break;
      case "log":
        console.log(arg[0]);
        break;
    }
  };

  const addLine = (line: string) => {
    if (line.startsWith("#!mmrl:")) {
      processCommand(line.substring(7));
    } else {
      setLines((lines) => [...lines, line]);
    }
  };

  const install = () => {
    const { exploreInstall, path, id } = extra;

    if (exploreInstall) {
      const envp_explore = {
        MMRL: "true",
        MMRL_VER: BuildConfig.VERSION_CODE.toString(),
        NAME: id,
        URL: path,
        ROOTMANAGER: Shell.getRootManager(),
        ...__modFS,
      };

      Terminal.exec({
        command: modFS("EXPLORE_INSTALL", {
          INCLUDECORE: INCLUDE_CORE,
          URL: path,
          MODID: id,
        }),
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
        ...__modFS,
      };

      Terminal.exec({
        command: modFS("LOCAL_INSTALL", {
          INCLUDECORE: INCLUDE_CORE,
          ZIPFILE: path,
        }),
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
