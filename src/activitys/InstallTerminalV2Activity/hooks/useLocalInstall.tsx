import { useActivity } from "@Hooks/useActivity";
import { TerminalActivityExtra } from "..";
import { v1 as uuidv1 } from "uuid";
import { Download } from "@Native/Download";
import React from "react";
import { useLines } from "./useLines";
import { useSettings } from "@Hooks/useSettings";
import { Terminal } from "@Native/Terminal";
import { BuildConfig } from "@Native/BuildConfig";
import { Shell } from "@Native/Shell";
import { Add, Remove, CodeRounded, ArrowBackIosRounded, RestartAlt } from "@mui/icons-material";

const useLocalInstall = (): [() => void] => {
  const TMPDIR = "/data/local/tmp";

  const { extra } = useActivity<TerminalActivityExtra>();
  const [printTerminalError] = useSettings("print_terminal_error");

  const { addText, addButton, rebootDevice, getInstallCLI } = useLines();

  const { modSource } = extra;

  return [
    () => {
      const zipfile = modSource[0];
      // const zipfiles = modSource;

      const local_install = new Terminal({
        cwd: TMPDIR,
        printError: printTerminalError,
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

      if (printTerminalError) {
        local_install.onError = (err) => {
          addText(`\x1b[38;5;130mⓘ${err}`);
        };
      }

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
            break;

          case Shell.M_INS_FAILURE:
            addText(" ");

            addText(
              "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
            );
            break;

          case Shell.TERM_INTR_ERR:
            addText("! \x1b[31mInternal error!\x1b[0m");
            break;

          default:
            addText("- Unknown code returned");
            break;
        }
      };

      local_install.exec(
        getInstallCLI({
          ZIPFILE: zipfile,
        })
      );
    },
  ];
};

export { useLocalInstall };
