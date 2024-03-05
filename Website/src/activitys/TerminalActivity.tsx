import { Page } from "@Components/onsenui/Page";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { Button, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Ansi } from "@Components/Ansi";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React from "react";
import { Shell } from "@Native/Shell";
import { useSettings } from "@Hooks/useSettings";
import { BuildConfig } from "@Native/BuildConfig";
import { useModFS } from "@Hooks/useModFS";
import { INCLUDE_CORE } from "@Util/INCLUDE_CORE";
import { view } from "@Native/View";
import { useConfirm } from "material-ui-confirm";

export interface TerminalActivityExtra {
  exploreInstall: boolean;
  path: string;
  id: string;
  source?: string;
  issues?: string;
}

const TerminalActivity = () => {
  const { context, extra } = useActivity<TerminalActivityExtra>();
  const { settings } = useSettings();
  const { modFS, __modFS } = useModFS();
  const [active, setActive] = React.useState<bool>(true);

  const [lines, setLines] = React.useState<any[]>([]);

  const confirm = useConfirm();
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

  const addText = (props: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Ansi,
        props: {
          linkify: true,
          sx: {
            ml: 1,
            mr: 1,
          },
          ...props,
        },
      },
    ]);
  };

  const addButton = (props: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Button,
        props: {
          variant: "contained",
          sx: {
            width: "50vmin",
            m: 1,
          },
          ...props,
        },
      },
    ]);
  };

  const rebootDevice = React.useCallback(() => {
    const reason = "";
    confirm({
      title: "Reboot device?",
      description: "Are you sure to reboot your device?",
      confirmationText: "Yes",
    }).then(() => {
      Shell.cmd(`/system/bin/svc power reboot ${reason} || /system/bin/reboot ${reason}`).exec();
    });
  }, []);

  const install = () => {
    const { exploreInstall, path, id, source, issues } = extra;

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
        cwd: "/data/local/tmp",
        env: envp_explore,
        onLine: (line) => {
          if (line.startsWith("#!mmrl:")) {
            processCommand(line.substring(7));
          } else {
            addText({ children: line.trim() });
          }
        },
        onExit: (code) => {
          switch (code) {
            case Shell.MODULE_INSTALL_SUCCESS:
              addText({ children: " " });

              addText({
                children:
                  "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m",
              });

              addButton({
                children: "Reboot",
                startIcon: <RestartAltIcon />,
                onClick: rebootDevice,
              });

              addText({
                children:
                  "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
              });

              if (issues) {
                addText({
                  children: `> \x1b[32mIssues: \x1b[33m${issues}\x1b[0m`,
                });
              }

              if (source) {
                addText({
                  children: `> \x1b[32mSource: \x1b[33m${source}\x1b[0m`,
                });
              }

              setActive(false);
              break;

            case Shell.MODULE_INSTALL_FAILURE:
              addText({ children: " " });

              addText({
                children:
                  "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
              });

              if (issues) {
                addText({
                  children: `> \x1b[32mIssues: \x1b[33m${issues}\x1b[0m`,
                });
              }

              if (source) {
                addText({
                  children: `> \x1b[32mSource: \x1b[33m${source}\x1b[0m`,
                });
              }

              setActive(false);
              break;

            case Shell.TERMINAL_INTERNAL_ERROR:
              addText({ children: "! \x1b[31mInternal error!\x1b[0m" });
              setActive(false);
              break;

            default:
              addText({ children: "- Unknown code returned" });
              setActive(false);
              break;
          }

          addText({ children: String(code) });
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
        cwd: "/data/local/tmp",
        onLine: (line) => {
          if (line.startsWith("#!mmrl:")) {
            processCommand(line.substring(7));
          } else {
            addText({ children: line.trim() });
          }
        },
        onExit: (code) => {
          switch (code) {
            case Shell.MODULE_INSTALL_SUCCESS:
              addText({ children: " " });

              addText({
                children:
                  "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m",
              });

              addButton({
                children: "Reboot",
                startIcon: <RestartAltIcon />,
                onClick: rebootDevice,
              });

              addText({
                children:
                  "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
              });

              setActive(false);
              break;

            case Shell.MODULE_INSTALL_FAILURE:
              addText({ children: " " });

              addText({
                children:
                  "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m",
              });

              setActive(false);
              break;

            case Shell.TERMINAL_INTERNAL_ERROR:
              addText({ children: "! \x1b[31mInternal error!\x1b[0m" });
              setActive(false);
              break;

            default:
              addText({ children: "- Unknown code returned" });
              setActive(false);
              break;
          }
        },
      });
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>{!active && <Toolbar.BackButton onClick={context.popPage} />}</Toolbar.Left>
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
            color: "white",
            height: "100%",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          {lines.map((line) => (
            <line.component {...line.props} />
          ))}
        </Stack>
      </div>
      <div style={{ height: view.getWindowBottomInsets() }} ref={termEndRef} />
    </Page>
  );
};

export default TerminalActivity;
