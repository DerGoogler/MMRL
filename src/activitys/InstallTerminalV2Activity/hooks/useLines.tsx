import { Ansi } from "@Components/Ansi";
import { useModFS } from "@Hooks/useModFS";
import { useStrings } from "@Hooks/useStrings";
import Button from "@mui/material/Button";
import { Shell } from "@Native/Shell";
import { useConfirm } from "material-ui-confirm";
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

type IntrCommand = (args: string[], options: Record<string, string>, add: any) => void;

interface LinesProviderProps extends React.PropsWithChildren {
  commands: Record<string, IntrCommand>;
}

const LinesProvider = (props: LinesProviderProps) => {
  const { strings } = useStrings();
  const { modFS } = useModFS();
  const [useInt, setUseInt] = React.useState(false);
  const [lines, setLines] = React.useState<any[]>([]);
  const confirm = useConfirm();
  const { commands, children } = props;

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

      const handleCommand = commands[command];
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
