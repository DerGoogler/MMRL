import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Ansi from "ansi-to-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { Shell } from "@Native/Shell";
import { formatString, useSettings } from "@Hooks/useSettings";
import { useNewerVersion } from "@Hooks/useNewerVersion";
import { BuildConfig } from "@Native/BuildConfig";

const TerminalActivity = () => {
  const { context, extra } = useActivity<any>();
  const { settings, modConf, _modConf } = useSettings();
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

  const installCli = (path: string) => {
    if (Shell.isMagiskSU()) {
      return modConf("MSUCLI", { ZIPFILE: path });
    } else if (Shell.isKernelSU()) {
      return modConf("KSUCLI", { ZIPFILE: path });
    } else {
      throw new Error("Unable to determine installation string");
    }
  };

  const env = (i: { [key: string]: string }) => {
    for (const k in i) {
      Shell.setenv(k, i[k], 1);
    }
  };

  const escapePath = React.useCallback(
    (path: string) => {
      return path.replace(/[\\^$*+?()[\]{}|\s]/g, "\\$&");
    },
    [extra.path]
  );

  const install = () => {
    const { exploreInstall, path } = extra;

    if (exploreInstall) {
      const url = new URL(path).pathname.split("/");

      const name = url[2];
      const branch = url[4].split(".").slice(0, -1).join(".");

      const installPath = window.__properties__.get("persist.mmrlini.install_folder", "/data/local/tmp/<NAME>-<BRANCH>-moduled.zip");

      const envp_explore = {
        MMRL: "true",
        MMRL_VER: BuildConfig.VERSION_CODE.toString(),
        NAME: name,
        URL: path,
        BRANCH: branch,
        INSTALLER_CLI: installCli(
          formatString(installPath, {
            NAME: name,
            BRANCH: branch,
          })
        ),
      };

      Terminal.exec({
        command: `${modConf("MMRLINI")}/system/usr/share/mmrl/bin/mmrl_explore_install`,
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

      console.log(escapePath(path))

      const envp_local = {
        MMRL: "true",
        MMRL_VER: BuildConfig.VERSION_CODE.toString(),
        INSTALLER_CLI: installCli(escapePath(path)),
      };

      Terminal.exec({
        command: `${modConf("MMRLINI")}/system/usr/share/mmrl/bin/mmrl_local_install`,
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
      onDeviceBackButton={(e: Event) => {
        e.preventDefault();
        if (!active) {
          context.popPage();
        }
      }}
      onShow={install}
      modifier="noshadow"
      renderToolbar={renderToolbar}
      backgroundStyle={{
        backgroundColor: "black",
      }}
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
