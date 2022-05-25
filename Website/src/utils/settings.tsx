import ons from "onsenui";
import AcknowledgementsActivity from "../activitys/AcknowledgementsActivity";
import AlertBuilder from "../builders/AlertBuilder";
import { ListInterface } from "../builders/ListViewBuilder";
import IssuesIcon from "../components/icons/IssuesIscon";
import LogsIcon from "../components/icons/LogsIcon";
import RepoIcon from "../components/icons/RepoIcon";
import Constants from "../native/Constants";
import LinkManager from "../native/LinkManager";
import PackageManager from "../native/PackageManager";
import PreferencesManager from "../native/PreferencesManager";
import tools from "./tools";

const prefManager = new PreferencesManager();

const settings: ListInterface[] = [
  {
    title: "Repo",
    content: [
      {
        key: "repo",
        type: "",
        icon: <RepoIcon size="24" />,
        text: "Custom repo",
        onClick: (key) => {
          new AlertBuilder()
            .setMessage("Custom repo")
            .setPromptCallback((input: string) => {
              if (tools.validURL(input)) {
                prefManager.setPref("repo", input);
                ons.notification.alert("Repo changed, please refresh the app");
              } else {
                ons.notification.alert("Invalid input");
              }
            })
            .showPrompt();
        },
      },
    ],
  },
  {
    title: "Appearance",
    content: [
      {
        key: "disable_lq_modules",
        type: "switch",
        text: "Disable low-quality module badge",
      },
    ],
  },
  {
    title: "Info",
    content: [
      {
        type: "",
        icon: <RepoIcon size="24" />,
        text: "Source code",
        onClick: () => {
          LinkManager.open("https://github.com/DerGoogler/MMRL/", "_blank");
        },
      },
      {
        type: "",
        icon: <LogsIcon size="24" />,
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
        icon: <IssuesIcon size="24" />,
        text: "Issues",
        onClick: (key, pushPage) => {
          LinkManager.open("https://github.com/DerGoogler/DG-Repo/issues", "_blank");
        },
      },
      {
        type: "",
        text: `${PackageManager.getAppPackageId} v${PackageManager.getAppVersionName} (${PackageManager.getAppVersionCode})`,
        style: {
          display: !Constants.isAndroid ? "none" : "",
          color: "darkgray",
        },
      },
    ],
  },
];

export default settings;
