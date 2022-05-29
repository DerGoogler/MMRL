import ons from "onsenui";
import AcknowledgementsActivity from "@Activitys/AcknowledgementsActivity";
import AlertBuilder from "@Builders/AlertBuilder";
import { ListInterface } from "@Builders/ListViewBuilder";
import IssuesIcon from "@Components/icons/IssuesIscon";
import LogsIcon from "@Components/icons/LogsIcon";
import RepoIcon from "@Components/icons/RepoIcon";
import Constants from "@Native/Constants";
import LinkManager from "@Native/LinkManager";
import PackageManager from "@Native/PackageManager";
import SharedPreferences from "@Native/SharedPreferences";
import tools from "@Utils/tools";
import { BugReportRounded, ExtensionRounded, GavelRounded, SourceRounded } from "@mui/icons-material";

const prefManager = new SharedPreferences();

const settings: ListInterface[] = [
  {
    title: "Repo",
    content: [
      {
        key: "repo",
        type: "",
        icon: <ExtensionRounded />,
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
        disabled: true,
        text: "Disable low-quality module badge",
      },
    ],
  },
  {
    title: "Info",
    content: [
      {
        type: "",
        icon: <SourceRounded />,
        text: "Source code",
        onClick: () => {
          LinkManager.open("https://github.com/DerGoogler/MMRL/", "_blank");
        },
      },
      {
        type: "",
        icon: <GavelRounded />,
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
        icon: <BugReportRounded />,
        text: "Issues",
        onClick: (key, pushPage) => {
          LinkManager.open("https://github.com/DerGoogler/DG-Repo/issues", "_blank");
        },
      },
      {
        type: "",
        text: (
          <span>
            {PackageManager.getAppPackageId} v{PackageManager.getAppVersionName} ({PackageManager.getAppVersionCode})<br />
            {Constants.isAndroid ? `${PackageManager.getMagiskVersionName} (${PackageManager.getMagiskVersionCode})` : ""}
          </span>
        ),
        style: {
          // display: !Constants.isAndroid ? "none" : "",
          color: "dimgray",
          fontSize: "15px",
        },
      },
    ],
  },
];

export default settings;
