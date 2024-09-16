import { Ansi } from "@Components/Ansi";
import { Image } from "@Components/dapi/Image";
import { useModFS } from "@Hooks/useModFS";
import { useStrings } from "@Hooks/useStrings";
import Button from "@mui/material/Button";
import { Shell } from "@Native/Shell";
import { SuFile } from "@Native/SuFile";
import { path } from "@Util/path";
import { useConfirm } from "material-ui-confirm";
import ModFS from "modfs";
import React from "react";

interface LinesContext {
  processCommand: (rawCommand: string) => string | undefined;
  lines: any[];
  setLines: React.Dispatch<React.SetStateAction<any[]>>;
  addButton: (text: string, props?: object) => void;
  addText: (text: string, props?: object) => void;
  setLastLine: (text: string, props?: object) => void;
  rebootDevice: (reason?: string) => void;
  getInstallCLI: (adds?: Record<string, any>) => string;
  clearTerminal: () => void;
}

const LinesContext = React.createContext<LinesContext>({
  processCommand(_rawCommand) {
    return "";
  },
  lines: [],
  setLines() {},
  addButton(_text, _props) {},
  addText(_text, _props) {},
  setLastLine(_text, _props) {},
  rebootDevice(reason) {},
  getInstallCLI(adds) {
    return "exit " + Shell.TERM_INTR_ERR;
  },
  clearTerminal() {},
});

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

interface LinesProviderProps extends React.PropsWithChildren {}

const LinesProvider = (props: LinesProviderProps) => {
  const { strings } = useStrings();
  const { modFS, modFSParse } = useModFS();
  const [useInt, setUseInt] = React.useState(false);
  const [lines, setLines] = React.useState<any[]>([]);
  const confirm = useConfirm();
  const { children } = props;

  const addText = (text: string, props?: object) => {
    const txt = processCommand(text);

    if (typeof txt === "string" && txt !== "undefined") {
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

  const format = React.useMemo(
    () => ({
      addImage(data: string) {
        addImage(data);
        return "undefined";
      },
      setLastLine(text: string) {
        if (typeof text === "undefined") return "undefined";
        setLastLine(text);
        return "undefined";
      },
      color: (text: string) => {
        if (typeof text === "undefined") return "undefined";
        return ModFS.format(text, colors);
      },
      clearTerminal: () => {
        setLines([]);
        return "undefined";
      },
      removeLastLine: () => {
        setLines((p) => p.slice(0, -1));
        return "undefined";
      },
    }),
    []
  );

  const processCommand = (rawCommand: string): string | "undefined" => {
    if (rawCommand.startsWith("#!mmrl:")) {
      rawCommand = rawCommand.substring(7);
      return ModFS.format(rawCommand, format) as string | "undefined";
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
    const __adds = {
      ...adds,
      findBinary(binaryNames: string, args: string) {
        const folders = ["/system/bin", "<ADB>/ksu/bin", "<ADB>/ap/bin", "<ADB>/magisk"];
        const _binaryNames = binaryNames.split(",");
        for (const binaryName of _binaryNames) {
          for (const folder of folders) {
            const binaryPath = path.join(folder, binaryName);
            if (SuFile.exist(binaryPath)) {
              return `${binaryPath} ${args}`;
            }
          }
        }
        return null;
      },
    };

    switch (Shell.getRootManager()) {
      case "Magisk":
        return modFS("MSUINI", __adds);
      case "KernelSU":
        return modFS("KSUINI", __adds);
      case "APatchSU":
        return modFS("ASUINI", __adds);
      default:
        return `exit ${Shell.M_DWL_FAILURE}`;
    }
  }, []);

  const clearTerminal = () => {
    setLines([]);
  };

  const value = React.useMemo(
    () => ({
      processCommand: processCommand,
      lines: lines,
      setLines: setLines,
      addButton: addButton,
      addText: addText,
      setLastLine: setLastLine,
      rebootDevice,
      getInstallCLI,
      clearTerminal,
    }),
    [processCommand, lines, setLines, useInt, setUseInt, addButton, addText, setLastLine, rebootDevice, getInstallCLI, clearTerminal]
  );

  return <LinesContext.Provider value={value} children={children} />;
};

const useLines = () => React.useContext(LinesContext);

export { useLines, LinesProvider };
