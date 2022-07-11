import { List } from "react-onsenui";
import ListViewBuilder from "@Builders/ListViewBuilder";
import pkg from "@Package";
import AppCompatActivity from "./AppCompatActivity";
import { string } from "@Strings";
import ons from "onsenui";
import AcknowledgementsActivity from "@Activitys/AcknowledgementsActivity";
import AlertDialog from "@Builders/AlertDialog";
import SharedPreferences, { ISharedPreferences } from "@Native/SharedPreferences";
import { link } from "googlers-tools";
import {
  Brightness2Rounded,
  BugReportRounded,
  ExtensionRounded,
  GavelRounded,
  PowerInputRounded,
  SourceRounded,
} from "@mui/icons-material";
import BuildConfig from "@Native/BuildConfig";
import { os } from "@Native/os";
import Icon from "@Components/Icon";
import Magisk from "@Native/Magisk";
import Toolbar from "@Builders/ToolbarBuilder";
import RepoGeneratorActivity from "./RepoGeneratorActivity";

interface Props {
  pushPage: any;
  popPage: any;
}

interface States {
  libs: any;
}

class SettingsActivity extends AppCompatActivity<Props, States> {
  private pref: ISharedPreferences;
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      libs: [],
    };

    this.pref = new SharedPreferences();
  }

  public componentDidMount = () => {
    super.componentDidMount;
    this.setState({ libs: Object.keys(pkg.dependencies) });
  };

  public onCreateToolbar(): Toolbar.Props {
    return {
      title: string.settings,
      onBackButton: this.props.popPage,
    };
  }

  public onCreate = () => {
    return (
      <>
        <settings-container style={{ height: "100%" }} className="settings-dfjsklgdj">
          <List>
            <ListViewBuilder
              data={[
                {
                  title: string.repository,
                  content: [
                    {
                      type: "",
                      icon: <Icon icon={ExtensionRounded} />,
                      text: string.custom_repository,
                      helper: {
                        text: "Test",
                      },
                      onClick: (key) => {
                        new AlertDialog.Builder()
                          .setTitle(string.custom_repository)
                          .setMessage("Only URLs are valid")
                          .setPositiveButton("Apply", (input: string) => {
                            if (input != null) {
                              if (input.startsWith(">")) {
                                switch (input) {
                                  case ">gmr":
                                    this.pref.setString("repo", "https://repo.dergoogler.com/modules.json");
                                    break;
                                  case ">mmar":
                                    this.pref.setString(
                                      "repo",
                                      "https://raw.githubusercontent.com/Magisk-Modules-Alt-Repo/json/main/modules.json"
                                    );
                                    break;
                                }
                              } else {
                                if (link.validURL(input)) {
                                  this.pref.setString("repo", input);
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
                        new AlertDialog.Builder()
                          .setTitle("Sure?")
                          .setMessage(
                            <div>
                              Do you wanna <span style={{ color: "red" }}>change</span> the language?
                            </div>
                          )
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
                  title: "Utils",
                  content: [
                    {
                      type: "",
                      text: "Generate repo",
                      onClick(key, pushPage) {
                        pushPage({
                          key: "repogeneraste",
                          activity: RepoGeneratorActivity,
                        });
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
                          {os.isAndroid ? `${Magisk.VERSION_NAME} (${Magisk.VERSION_CODE})` : ""}
                        </span>
                      ),
                      style: {
                        color: "dimgray",
                        fontSize: "15px",
                      },
                    },
                  ],
                },
              ]}
              pushPage={this.props.pushPage}
            />
          </List>
        </settings-container>
      </>
    );
  };
}

export default SettingsActivity;
