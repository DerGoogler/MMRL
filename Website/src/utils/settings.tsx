import ons from "onsenui";
import AcknowledgementsActivity from "@Activitys/AcknowledgementsActivity";
import AlertBuilder from "@Builders/AlertBuilder";
import { IListInterface } from "@Builders/ListViewBuilder";
import SharedPreferences from "@Native/SharedPreferences";
import tools from "@Utils/tools";
import {
  Brightness2Rounded,
  BugReportRounded,
  ExtensionRounded,
  GavelRounded,
  PowerInputRounded,
  SourceRounded,
  TerminalRounded,
} from "@mui/icons-material";
import BuildConfig from "@Native/BuildConfig";
import { os } from "@Native/os";
import Build from "@Native/Build";
import Icon from "@Components/Icon";
import { string } from "@Strings";
import fs from "@Native/fs";
import Magiskboot from "@Native/Magiskboot";
import Toast from "@Native/Toast";

const prefManager = new SharedPreferences();

const settings: IListInterface[] = [
  {
    title: string.repository,
    content: [
      {
        type: "",
        icon: <Icon icon={ExtensionRounded} />,
        text: string.custom_repository,
        onClick: (key) => {
          new AlertBuilder()
            .setTitle(string.custom_repository)
            .setMessage("Only URLs are valid")
            .setPositiveButton("Apply", (input: string) => {
              if (input != null) {
                if (input.startsWith(">")) {
                  switch (input) {
                    case ">gmr":
                      prefManager.setString("repo", "https://repo.dergoogler.com/modules.json");
                      break;
                    case ">mmar":
                      prefManager.setString("repo", "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json");
                      break;
                  }
                } else {
                  if (tools.validURL(input)) {
                    prefManager.setString("repo", input);
                    ons.notification.alert("Repo changed, please refresh the app");
                  } else {
                    ons.notification.alert("Invalid input");
                  }
                }
              }
            })
            .setNegativeButtom("Cancel", () => {})
            .showPrompt();
        },
      },
    ],
  },
  {
    title: string.appearance,
    content: [
      {
        key: "language",
        icon: "language",
        type: "select",
        text: string.language,
        selectDefaultValue: "en",
        selectValue: [
          {
            text: "English",
            value: "en",
          },
          {
            text: "German",
            value: "de",
          },
        ],
        callback: (e: Event, key: string, keepDefaultFuntion: void) => {
          new AlertBuilder()
            .setTitle("Sure?")
            .setMessage("Do you wanna change the language?")
            .setPositiveButton("Yes", (input: string) => {
              keepDefaultFuntion;
            })
            .showAlert();
        },
      },
      {
        key: "enableDarkmode",
        type: "switch",
        icon: <Icon icon={Brightness2Rounded} />,
        text: string.dark_theme,
      },
      {
        key: "enableBottomTabs",
        type: "switch",
        icon: <Icon icon={PowerInputRounded} />,
        disabled: !os.isAndroid,
        text: string.bottom_navigation.text,
        subtext: !os.isAndroid ? string.not_supported_in_web_version : string.bottom_navigation.subtext,
      },
    ],
  },

  {
    title: "Util",
    content: [
      {
        type: "",
        text: "Unpack boot",
        onClick: () => {
          new AlertBuilder()
            .setTitle("Unpack boot")
            .setMessage("The boot.img will in the current work directory unpacked")
            .setPositiveButton("try", (input: string) => {
              if (input != null) {
                const boo = new fs(input);
                try {
                  if (boo.existFile()) {
                    Magiskboot.unpack(["-h", input]);
                  } else {
                    Toast.makeText(`${input} does not exist`, Toast.LENGTH_SHORT).show();
                  }
                } catch (e: any) {
                  Toast.makeText(e, Toast.LENGTH_SHORT).show();
                }
              }
            })
            .setNegativeButtom("Cancel", () => {})
            .showPrompt();
        },
      },
      {
        type: "",
        text: "Boot status",
        onClick: () => {
          new AlertBuilder()
            .setTitle("Boot status")
            .setMessage("Enter the ramdisk.cpio file")
            .setPositiveButton("try", (input: string) => {
              if (input != null) {
                const boo = new fs(input);
                try {
                  if (boo.existFile()) {
                    switch (Number(Magiskboot.cpio([input, "test"]))) {
                      case 0:
                        Toast.makeText("Stock boot image detected", Toast.LENGTH_SHORT).show();
                        break;
                      case 1:
                        Toast.makeText("Magisk patched boot image detected", Toast.LENGTH_SHORT).show();
                        break;
                      case 2:
                        Toast.makeText("Boot image patched by unsupported programs", Toast.LENGTH_SHORT).show();
                        break;
                      default:
                        Toast.makeText("Unable to detect status", Toast.LENGTH_SHORT).show();
                        break;
                    }
                  } else {
                    Toast.makeText(`${input} does not exist`, Toast.LENGTH_SHORT).show();
                  }
                } catch (e: any) {
                  Toast.makeText(e, Toast.LENGTH_SHORT).show();
                }
              }
            })
            .setNegativeButtom("Cancel", () => {})
            .showPrompt();
        },
      },
    ],
  },
  {
    title: "Info",
    content: [
      {
        type: "",
        icon: <Icon icon={SourceRounded} />,
        text: string.source_code,
        onClick: () => {
          window.open("https://github.com/DerGoogler/MMRL/", "_blank");
        },
      },
      {
        type: "",
        icon: <Icon icon={GavelRounded} />,
        text: "Acknowledgements",
        onClick: (key, pushPage) => {
          pushPage({
            key: "acknowledgements",
            activity: AcknowledgementsActivity,
          });
        },
      },
      {
        type: "",
        icon: <Icon icon={BugReportRounded} />,
        text: "Issues",
        onClick: (key, pushPage) => {
          window.open("https://github.com/DerGoogler/DG-Repo/issues", "_blank");
        },
      },
      {
        type: "",
        text: (
          <span>
            {BuildConfig.APPLICATION_ID} v{BuildConfig.VERSION_NAME} ({BuildConfig.VERSION_CODE})<br />
            {os.isAndroid ? `${BuildConfig.MAGISK.VERSION_NAME} (${BuildConfig.MAGISK.VERSION_CODE})` : ""}
          </span>
        ),
        style: {
          color: "dimgray",
          fontSize: "15px",
        },
      },
    ],
  },
];

export default settings;
