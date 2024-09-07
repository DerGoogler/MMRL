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

// const useLocalInstall = (): [() => void] => {
//   const TMPDIR = "/data/local/tmp";

//   const { extra } = useActivity<TerminalActivityExtra>();
//   const [printTerminalError] = useSettings("print_terminal_error");

//   const { addText, addButton, rebootDevice, getInstallCLI } = useLines();

//   const { modSource } = extra;

//   return [
//     () => {
//       const zipfile = modSource[0];
//       // const zipfiles = modSource;

//       const local_install = new Terminal({
//         cwd: TMPDIR,
//         printError: printTerminalError,
//       });

//       local_install.env = {
//         ASH_STANDALONE: "1",
//         MMRL: "true",
//         MMRL_INTR: "true",
//         MMRL_VER: BuildConfig.VERSION_CODE.toString(),
//         ROOTMANAGER: Shell.getRootManager(),
//       };

//       local_install.onLine = (line) => {
//         addText(line);
//       };

//       if (printTerminalError) {
//         local_install.onError = (err) => {
//           addText(`\x1b[38;5;130mⓘ${err}`);
//         };
//       }

//       local_install.onExit = (code) => {
//         switch (code) {
//           case Shell.M_INS_SUCCESS:
//             addText(" ");

//             addText(
//               "\x1b[93mYou can press the \x1b[33;4mbutton\x1b[93;0m\x1b[93m below to \x1b[33;4mreboot\x1b[93;0m\x1b[93m your device\x1b[0m"
//             );

//             addButton("Reboot", {
//               startIcon: <RestartAlt />,
//               onClick: rebootDevice,
//             });

//             addText(
//               "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
//             );
//             break;

//           case Shell.M_INS_FAILURE:
//             addText(" ");

//             addText(
//               "\x1b[2mModules that causes issues after installing belog not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to thier support page\x1b[2m"
//             );
//             break;

//           case Shell.TERM_INTR_ERR:
//             addText("! \x1b[31mInternal error!\x1b[0m");
//             break;

//           default:
//             addText("- Unknown code returned");
//             break;
//         }
//       };

//       local_install.exec(
//         getInstallCLI({
//           ZIPFILE: zipfile,
//         })
//       );
//     },
//   ];
// };

// export { useLocalInstall };

type LocalInstall = {
  file: string;
  printExit?: boolean;
};

const useLocalInstall = (): [(options: LocalInstall) => Promise<void>] => {
  const TMPDIR = "/data/local/tmp";
  const { extra } = useActivity<TerminalActivityExtra>();
  const [printTerminalError] = useSettings("print_terminal_error");
  const { addText, addButton, rebootDevice, getInstallCLI } = useLines();
  const { modSource } = extra;

  const localInstaller = async (options: LocalInstall): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const zipfile = options.file;
      const printExit = options.printExit ?? true;

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

      // Handle terminal output lines
      local_install.onLine = (line) => {
        addText(line);
      };

      // Handle terminal errors
      if (printTerminalError) {
        local_install.onError = (err) => {
          addText(`\x1b[38;5;130mⓘ${err}`);
        };
      }

      // Handle terminal exit with a promise resolution
      local_install.onExit = (code) => {
        if (printExit) {
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
                "\x1b[2mModules that causes issues after installing belong not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to their support page\x1b[2m"
              );
              break;

            case Shell.M_INS_FAILURE:
              addText(" ");
              addText(
                "\x1b[2mModules that causes issues after installing belong not to \x1b[35;4mMMRL\x1b[0;2m!\nPlease report these issues to their support page\x1b[2m"
              );
              break;

            case Shell.TERM_INTR_ERR:
              addText("! \x1b[31mInternal error!\x1b[0m");
              break;

            default:
              addText("- Unknown code returned");
              break;
          }
        }
        resolve(); // Resolve on unknown code, as execution has finished
      };

      // Execute the installation command
      try {
        local_install.exec(
          getInstallCLI({
            ZIPFILE: zipfile,
          })
        );
      } catch (err) {
        addText(`! \x1b[31mExecution error: ${err}\x1b[0m`);
        reject(err); // Reject on execution error
      }
    });
  };

  return [localInstaller];
};

export { useLocalInstall };
