import ons from "onsenui";
import AcknowledgementsActivity from "@Activitys/AcknowledgementsActivity";
import AlertBuilder from "@Builders/AlertBuilder";
import { ListInterface } from "@Builders/ListViewBuilder";
import Constants from "@Native/Constants";
import SharedPreferences from "@Native/SharedPreferences";
import tools from "@Utils/tools";
import { BugReportRounded, ExtensionRounded, GavelRounded, SourceRounded } from "@mui/icons-material";
import BuildConfig from "@Native/BuildConfig";

const prefManager = new SharedPreferences();

const settings: ListInterface[] = [
  {
    title: "Repo",
    content: [
      {
        type: "",
        icon: <ExtensionRounded />,
        text: "Custom repo",
        onClick: (key) => {
          new AlertBuilder()
            .setTitle("Custom repo")
            .setMessage("Only URLs are valid")
            .setPositiveButton("Apply", (input: string) => {
              if (input != null) {
                if (tools.validURL(input)) {
                  prefManager.setPref("repo", input);
                  ons.notification.alert("Repo changed, please refresh the app");
                } else {
                  ons.notification.alert("Invalid input");
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
          window.open("https://github.com/DerGoogler/MMRL/", "_blank");
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
          window.open("https://github.com/DerGoogler/DG-Repo/issues", "_blank");
        },
      },
      {
        type: "",
        text: (
          <span>
            {BuildConfig.APPLICATION_ID} v{BuildConfig.VERSION_NAME} ({BuildConfig.VERSION_CODE})<br />
            {Constants.isAndroid ? `${BuildConfig.MAGISK.VERSION_NAME} (${BuildConfig.MAGISK.VERSION_CODE})` : ""}
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
