import React from "react";
import { Add, Remove, CodeRounded, ArrowBackIosRounded, RestartAlt } from "@mui/icons-material";
import { Stack, Box, Slider, Button, Typography, TextField, alpha, LinearProgress } from "@mui/material";
import FlatList from "flatlist-react";
import { Ansi } from "@Components/Ansi";
import { useTheme } from "@Hooks/useTheme";
import { useSettings } from "@Hooks/useSettings";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { view } from "@Native/View";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { useConfirm } from "material-ui-confirm";
import { Shell } from "@Native/Shell";
import { BuildConfig } from "@Native/BuildConfig";
import { useModFS } from "@Hooks/useModFS";
import { formatString } from "@Util/stringFormat";
import { Terminal } from "@Native/Terminal";
import { Image } from "@Components/dapi/Image";
import { Download } from "@Native/Download";
import { v1 as uuidv1 } from "uuid";

type IntrCommand = (args: string[], options: Record<string, string>, add: any) => void;

export interface TerminalActivityExtra {
  exploreInstall: boolean;
  modSource: string[];
  id: string;
  source?: string;
  issues?: string;
}

const colors = {
  R: "\x1b[0m",
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[2m",
  UNDERSCORE: "\x1b[4m",
  FG: {
    BLACK: "\x1b[30m",
    RED: "\x1b[31m",
    GREEN: "\x1b[32m",
    YELLOW: "\x1b[33m",
    BLUE: "\x1b[34m",
    MAGENTA: "\x1b[35m",
    CYAN: "\x1b[36m",
    WHITE: "\x1b[37m",
    GRAY: "\x1b[90m",
  },
  BG: {
    BLACK: "\x1b[40m",
    RED: "\x1b[41m",
    GREEN: "\x1b[42m",
    YELLOW: "\x1b[43m",
    BLUE: "\x1b[44m",
    MAGENTA: "\x1b[45m",
    CYAN: "\x1b[46m",
    WHITE: "\x1b[47m",
    GRAY: "\x1b[100m",
  },
};

const useLines = (cmds: Record<string, IntrCommand>) => {
  const [useInt, setUseInt] = React.useState(false);
  const [lines, setLines] = React.useState<any[]>([]);

  const addText = (text: string, props?: object) => {
    const txt = processCommand(text);
    if (typeof txt === "string") {
      setLines((lines) => [
        ...lines,
        {
          component: Ansi,
          props: {
            children: txt,
            sx: {
              mr: 1,
              ml: 1,
            },
            linkify: true,
            ...props,
          },
        },
      ]);
    }
  };

  const setLastLine = (text: string, props?: object) => {
    setLines((p) => p.slice(0, -1));
    addText(text, props);
  };

  const addImage = (data: string, props?: object) => {
    if (typeof data === "string") {
      setLines((lines) => [
        ...lines,
        {
          component: Image,
          props: {
            src: data,
            noOpen: true,
            sx: {
              mr: 1,
              ml: 1,
            },
            ...props,
          },
        },
      ]);
    }
  };

  const addButton = (text: string, props?: object) => {
    setLines((lines) => [
      ...lines,
      {
        component: Button,
        props: {
          children: text,
          variant: "contained",
          sx: {
            width: "50vmin",
            mt: 1,
            mb: 1,
          },
          ...props,
        },
      },
    ]);
  };

  const processCommand = (rawCommand: string) => {
    if (rawCommand.startsWith("#!mmrl:")) {
      let args: string[] = [];
      let options = {};
      let command: string;
      rawCommand = rawCommand.substring(7);
      const i = rawCommand.indexOf(" ");

      if (i !== -1 && rawCommand.length !== i + 1) {
        // Extract command arguments and options
        const argsString = rawCommand.substring(i + 1).trim();
        const matches = argsString.match(/"([^"]+)"|--?[\w-]+|\S+/g);

        if (matches) {
          for (let j = 0; j < matches.length; j++) {
            let match = matches[j];
            if (match.startsWith("--")) {
              // Long option
              const key = match.substring(2);
              let value: string | boolean = true;
              if (j + 1 < matches.length && !matches[j + 1].startsWith("-")) {
                value = matches[++j];
                // Remove surrounding quotes if present
                if (value.startsWith('"') && value.endsWith('"')) {
                  value = value.slice(1, -1);
                }
              }
              options[key] = value;
            } else if (match.startsWith("-")) {
              // Short option
              const key = match.substring(1);
              let value: string | boolean = true;
              if (j + 1 < matches.length && !matches[j + 1].startsWith("-")) {
                value = matches[++j];
                // Remove surrounding quotes if present
                if (value.startsWith('"') && value.endsWith('"')) {
                  value = value.slice(1, -1);
                }
              }
              options[key] = value;
            } else {
              // Positional argument
              // Remove surrounding quotes if present
              if (match.startsWith('"') && match.endsWith('"')) {
                match = match.slice(1, -1);
              }
              args.push(match);
            }
          }
        }

        command = rawCommand.substring(0, i);
      } else {
        command = rawCommand;
      }

      const handleCommand = cmds[command];
      if (handleCommand) {
        handleCommand(args, options, { addButton: addButton, addText: addText, addImage: addImage, setLines: setLines, lines: lines });
      }
    } else {
      const info = /^\-(\s+)?(.+)/gm;
      const warn = /^\?(\s+)?(.+)/gm;
      const erro = /^\!(\s+)?(.+)/gm;

      if (rawCommand.match(info)) {
        return rawCommand.replace(info, "$2");
      } else if (rawCommand.match(erro)) {
        return rawCommand.replace(erro, "\x1b[31m$2\x1b[0m");
      } else if (rawCommand.match(warn)) {
        return rawCommand.replace(warn, "\x1b[33m$2\x1b[0m");
      } else {
        return rawCommand;
      }
    }
  };

  return {
    processCommand: processCommand,
    lines: lines,
    setLines: setLines,
    useInt: useInt,
    setUseInt: setUseInt,
    addButton: addButton,
    addText: addText,
    setLastLine: setLastLine,
  };
};

const TMPDIR = "/data/local/tmp";

export const InstallTerminalV2Activity = () => {
  const { context, extra } = useActivity<TerminalActivityExtra>();
  const { theme } = useTheme();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { modFS, __modFS } = useModFS();
  const confirm = useConfirm();

  const termEndRef = React.useRef<HTMLDivElement>(null);

  const [active, setActive] = React.useState<bool>(true);
  const { lines, addText, addButton, setLastLine } = useLines({
    color: (args, _, add) => {
      add.addText(formatString(args[0], colors));
    },
    clearTerminal: (_, __, add) => {
      add.setLines([]);
    },
    setLastLine: (args, __, add) => {
      add.setLines((p) => p.slice(0, -1));
      addText(args[0]);
    },
    removeLastLine: (_, __, add) => {
      add.setLines((p) => p.slice(0, -1));
    },
    addImage: (args, opt, add) => {
      const { width, height } = opt;
      add.addImage(args[0], {
        sx: {
          width: width || "80vmin",
          height: height,
        },
      });
    },
    addButton: (args, opt, add) => {
      const { variant } = opt;
      add.addButton(args[0], {
        sx: {
          width: "50vmin",
          mt: 1,
          mb: 1,
        },
        variant: variant,
      });
    },
  });

  // ensure that it is always the same function
  const nativeVolumeEventPrevent = React.useCallback((e: Event) => {
    e.preventDefault();
  }, []);
  React.useEffect(() => {
    document.addEventListener("volumeupbutton", nativeVolumeEventPrevent, false);
    document.addEventListener("volumedownbutton", nativeVolumeEventPrevent, false);
    return () => {
      document.removeEventListener("volumeupbutton", nativeVolumeEventPrevent, false);
      document.removeEventListener("volumedownbutton", nativeVolumeEventPrevent, false);
    };
  }, []);

  if (settings.term_scroll_bottom) {
    const termBehavior = React.useMemo(() => settings.term_scroll_behavior, [settings]);

    React.useEffect(() => {
      termEndRef.current?.scrollIntoView({ behavior: termBehavior.value, block: "end", inline: "nearest" });
    }, [lines]);
  }

  const rebootDevice = React.useCallback((reason: string = "") => {
    confirm({
      title: strings("reboot_device"),
      description: strings("reboot_device_desc"),
      confirmationText: strings("yes"),
      cancellationText: strings("cancel"),
    }).then(() => {
      Shell.cmd(`/system/bin/svc power reboot ${reason} || /system/bin/reboot ${reason}`).exec();
    });
  }, []);

  const getInstallCLI = React.useCallback((adds?: Record<string, any>) => {
    switch (Shell.getRootManager()) {
      case "Magisk":
        return modFS("MSUINI", adds);
      case "KernelSU":
        return modFS("KSUINI", adds);
      case "APatchSU":
        return modFS("ASUINI", adds);
      default:
        return `exit ${Shell.M_DWL_FAILURE}`;
    }
  }, []);

  const [downloadProgress, setDownloadProgress] = React.useState(0);

  const install = () => {
    const { exploreInstall, modSource, id, source, issues } = extra;

    if (exploreInstall) {
      const url = modSource[0];
      // const urls = modSource;

      const modPath = `${TMPDIR}/${uuidv1()}.zip`;

      const dl = new Download(url, modPath);

      dl.onChange = (obj) => {
        switch (obj.type) {
          case "downloading":
            setDownloadProgress(obj.state);
            setLastLine(`- Downlaoding module progress: ${obj.state}%`);
            break;
          case "finished":
            setDownloadProgress(0);

            const explore_install = new Terminal({
              cwd: TMPDIR,
              printError: settings.print_terminal_error,
            });

            explore_install.env = {
              ASH_STANDALONE: "1",
              MMRL: "true",
              MMRL_INTR: "true",
              MMRL_VER: BuildConfig.VERSION_CODE.toString(),
              ROOTMANAGER: Shell.getRootManager(),
            };

            explore_install.onLine = (line) => {
              addText(line);
            };

            explore_install.onExit = (code) => {
              switch (code) {
                case Shell.M_INS_SUCCESS:
                  addText(" ");
                  addText(
                    "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m"
                  );
                  addButton("Reboot", {
                    startIcon: <RestartAlt />,
                    onClick: rebootDevice,
                  });
                  addText(
                    "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
                  );
                  if (issues) {
                    addText(`> \x1b[32mIssues: \x1b[33m${issues}\x1b[0m`);
                  }
                  if (source) {
                    addText(`> \x1b[32mSource: \x1b[33m${source}\x1b[0m`);
                  }
                  setActive(false);
                  break;
                case Shell.M_INS_FAILURE:
                  addText(" ");
                  addText(
                    "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
                  );
                  if (issues) {
                    addText(`> \x1b[32mIssues: \x1b[33m${issues}\x1b[0m`);
                  }
                  if (source) {
                    addText(`> \x1b[32mSource: \x1b[33m${source}\x1b[0m`);
                  }
                  setActive(false);
                  break;
                case Shell.TERM_INTR_ERR:
                  addText("! \x1b[31mInternal error!\x1b[0m");
                  setActive(false);
                  break;
                default:
                  addText("? Unknown code returned");
                  setActive(false);
                  break;
              }
            };

            explore_install.exec(
              getInstallCLI({
                ZIPFILE: modPath,
              })
            );

            break;
        }
      };

      dl.onError = (err) => {
        setDownloadProgress(0);
        addText("! \x1b[31mUnable to download the module\x1b[0m");
        addText("! \x1b[31mERR: " + err + "\x1b[0m");
        setActive(false);
      };

      dl.start();
    } else {
      const zipfile = modSource[0];
      // const zipfiles = modSource;

      const local_install = new Terminal({
        cwd: TMPDIR,
        printError: settings.print_terminal_error,
      });

      local_install.env = {
        ASH_STANDALONE: "1",
        MMRL: "true",
        MMRL_INTR: "true",
        MMRL_VER: BuildConfig.VERSION_CODE.toString(),
        ROOTMANAGER: Shell.getRootManager(),
      };

      local_install.onLine = (line) => {
        addText(line);
      };

      local_install.onExit = (code) => {
        switch (code) {
          case Shell.M_INS_SUCCESS:
            addText(" ");

            addText(
              "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m"
            );

            addButton("Reboot", {
              startIcon: <RestartAlt />,
              onClick: rebootDevice,
            });

            addText(
              "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
            );

            setActive(false);
            break;

          case Shell.M_INS_FAILURE:
            addText(" ");

            addText(
              "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
            );

            setActive(false);
            break;

          case Shell.TERM_INTR_ERR:
            addText("! \x1b[31mInternal error!\x1b[0m");
            setActive(false);
            break;

          default:
            addText("- Unknown code returned");
            setActive(false);
            break;
        }
      };

      local_install.exec(
        getInstallCLI({
          ZIPFILE: zipfile,
        })
      );
    }
  };

  const renderToolbar = () => {
    return (
      <Toolbar
        modifier="noshadow"
        sx={{
          position: "relative !important",
        }}
      >
        <Toolbar.Left>{!active && <Toolbar.BackButton onClick={context.popPage} />}</Toolbar.Left>
        <Toolbar.Center>Install</Toolbar.Center>
        {downloadProgress !== 0 && (
          <LinearProgress
            sx={{ width: "100%", left: 0, right: 0, position: "absolute", bottom: 0 }}
            variant="determinate"
            value={downloadProgress}
          />
        )}
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
      sx={{
        pl: 1,
        pr: 1,
        // removing bottom window insets
        pb: "0px !important",
      }}
      onShow={install}
      modifier="noshadow"
      renderToolbar={renderToolbar}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Stack
          style={{
            whiteSpace: !settings.terminal_word_wrap ? "pre" : "unset",
            flex: "0 0 100%",
            color: "white",
            height: "100%",
            fontSize: "smaller",
          }}
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={0}
        >
          <FlatList
            list={lines}
            renderItem={(line, key) => (
              <Box
                sx={{
                  display: "flex",
                  ":hover": {
                    backgroundColor: alpha("#fff", 0.03),
                  },
                  code: {
                    wordBreak: settings.terminal_word_wrap ? "break-all" : "unset",
                  },
                }}
              >
                {settings.terminal_numberic_lines && (
                  <Typography
                    sx={(theme) => ({
                      minWidth: "40px",
                      paddingRight: "1em",
                      fontSize: "unset",
                      marginLeft: "calc(18px - 1em)",
                      color: theme.palette.text.secondary,
                      textAlign: "right",
                      textDecoration: "none",
                    })}
                  >
                    {Number(key) + 1}
                  </Typography>
                )}

                <line.component key={key} {...line.props} />
              </Box>
            )}
            renderOnScroll
            renderWhenEmpty={() => <></>}
          />
        </Stack>
      </Box>
      <Box sx={{ height: view.getWindowBottomInsets() }} ref={termEndRef} />
    </Page>
  );
};

export default InstallTerminalV2Activity;
