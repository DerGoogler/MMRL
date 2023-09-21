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

function useOnceCall(effect: React.EffectCallback, deps?: React.DependencyList | undefined) {
  const isCalledRef = React.useRef(false);

  React.useEffect(() => {
    if (deps && !isCalledRef.current) {
      isCalledRef.current = true;
      effect();
    }
  }, [effect, deps]);
}

const TerminalActivity = () => {
  const { context, extra } = useActivity<any>();
  const { settings } = useSettings();
  const [active, setActive] = React.useState<bool>(true);

  const [lines, setLines] = React.useState<string[]>([]);

  const ref = React.useRef<HTMLDivElement>(null);

  const addLine = (line: string) => {
    setLines((lines) => [...lines, line]);
  };

  const dl = (url: string, savePath: string, saveName: string) => {
    try {
      return window.__sufile__.downloadFile(url, savePath, saveName);
    } catch {
      return false;
    }
  };

  const unzip = (file: string, target: string) => {
    try {
      return window.__sufile__.unzip(file, target);
    } catch {
      return false;
    }
  };

  const installCli = (path: string) => {
    if (Shell.isMagiskSU()) {
      return settings.mod_msu_cli.replace(/{path}/i, path);
    } else if (Shell.isKernelSU()) {
      return settings.mod_ksu_cli.replace(/{path}/i, path);
    } else {
      throw new Error("Unable to determine installation string");
    }
  };

  const install = () => {
    const { exploreInstall, path } = extra;

    if (exploreInstall) {
      const url = new URL(path).pathname.split("/");
      const getFileName = url[2] + "-" + url[4];

      addLine("- Download module");
      const success = dl(path, "/sdcard/MMRL/", getFileName);

      if (success) {
        addLine("- Unzipping file");
        const unzippSuccess = unzip(`/sdcard/MMRL/${getFileName}`, "/sdcard/MMRL/unzipped/");

        if (unzippSuccess) {
          addLine("\x1B[32m- Success\x1b[0m");
          setActive(false);
        } else {
          setActive(false);
          addLine("\x1B[31m! Unzipping failed\x1b[0m");
        }
      } else {
        setActive(false);
        addLine("\x1B[31m! Download failed\x1b[0m");
      }
    } else {
      // @ts-ignore
      Terminal.exec(
        installCli(path),
        (r) => {
          addLine(r);
        },
        (code) => {
          if (code) {
            setActive(false);
          }
        }
      );
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>{!active && <Toolbar.Button icon={ArrowBackIcon} onClick={context.popPage} />}</Toolbar.Left>
        <Toolbar.Center>Installer</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page
      onDeviceBackButton={(e: Event) => {
        if (active) {
          e.preventDefault();
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
            paddingTop: 8,
            paddingBottom: 8,
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
    </Page>
  );
};

const StyledItem = styled(Ansi)((theme) => ({
  marginLeft: 8,
  marginRight: 8,
}));

export default TerminalActivity;
