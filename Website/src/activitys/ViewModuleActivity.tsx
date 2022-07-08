import { ToolbarButton, Dialog, Button } from "react-onsenui";
import ons from "onsenui";
import axios from "axios";
import { DownloadRounded, InfoRounded, InstallMobileRounded, VerifiedRounded } from "@mui/icons-material";
import BuildConfig from "@Native/BuildConfig";
import { HighlightedMarkdown } from "@Components/HighlightMarkdown";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import Alert from "@mui/material/Alert";
import AppCompatActivity from "./AppCompatActivity";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import { string } from "@Strings";

interface Props {
  extra?: any;
  popPage: any;
}

interface States {
  notes: string;
  dialogShown: boolean;
}

class ViewModuleActivity extends AppCompatActivity<Props, States> {
  public static readonly ignoreURL: bool = true;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      notes: "",
      dialogShown: false,
    };
  }

  public componentDidMount = () => {
    axios
      .get(this.props.extra?.notes)
      .then((response) => {
        this.setState({
          notes: response.data,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({
            notes: `# 404: Not Found\n\n The author doesn't have created or uploaded an \`README.md\`, please try again later.\n\n\n## About Readme's\n\n- ❌ readme.md\n- ✅ README.md`,
          });
        }
      })
      .then(() => {
        // always executed
      });
  };

  public onCreateToolbar = () => {
    const { minMagisk, minApi, maxApi, needRamdisk, changeBoot } = this.props.extra?.moduleProps;
    return (
      <ToolbarBuilder
        title={this.props.extra.name}
        onBackButton={this.props.popPage}
        addToolbarButton={
          <>
            {(minMagisk || minApi || maxApi || needRamdisk || changeBoot) != (null || undefined) ? (
              <div className="right">
                <ToolbarButton style={{ padding: "0px 10px" }} onClick={this.showDialog}>
                  <InfoRounded />
                </ToolbarButton>
              </div>
            ) : null}
          </>
        }
        addToolbarButtonPosition="right"
      />
    );
  };

  private showDialog = () => {
    this.setState({ dialogShown: true });
  };

  private hideDialog = () => {
    this.setState({ dialogShown: false });
  };

  public onCreate = () => {
    const { minMagisk, minApi, maxApi, needRamdisk, changeBoot, name, stars, alpahMMRLinstall } = this.props.extra?.moduleProps;
    const { download, id } = this.props.extra;
    const { verified, low } = this.props.extra?.moduleOptions;
    return (
      <>
        <div
          style={{ padding: "8px", marginBottom: "56px", height: "100%" }}
          className={new SharedPreferences().getBoolean("enableDarkmode_switch", false) ? "markdown-body-dark" : "markdown-body-light"}
        >
          {
            /*
            // @ts-ignore */
            (() => {
              if (verified) {
                return (
                  <Alert key="verified-module" icon={<VerifiedRounded fontSize="inherit" />} severity="success">
                    {string.module_verified}
                  </Alert>
                );
              }
            })()
          }
          <HighlightedMarkdown children={this.state.notes} />
        </div>
        <div
          style={{
            position: "fixed",
            display: "flex",
            left: 0,
            bottom: 0,
            padding: "8px",
            width: "100%",
            textAlign: "center",
            backgroundColor: SharedPreferences.getBoolean("enableDarkmode_switch", false)
              ? "rgba(18, 18, 18, .85)"
              : "rgba(256, 256, 256, .85)",
          }}
        >
          {/*
          // @ts-ignore */}
          <Button
            modifier="large"
            onClick={() => {
              window.open(download);
              // Toast.makeText(`Download ${id!}`, Toast.LENGTH_LONG).show();
              // fs.download(`${id!}.zip`, download);
            }}
          >
            {string.download} <DownloadRounded sx={{ color: "white" }} />
          </Button>
          <div style={{ padding: "4px", display: !os.isAndroid ? "none" : "" }}></div>
          {/*
          // @ts-ignore */}
          <Button
            modifier="large"
            disabled={!os.isAndroid}
            style={{
              display: !os.isAndroid ? "none" : "",
            }}
            onClick={() => {
              ons.notification.alert("The option will be available in the future");
            }}
          >
            {string.install} <InstallMobileRounded sx={{ color: "white" }} />
          </Button>
        </div>
        {/*
          // @ts-ignore */}
        <Dialog visible={this.state.dialogShown} cancelable={true} onDialogCancel={this.hideDialog}>
          <div style={{ margin: "20px" }} className="markdown-body-light">
            <table style={{ width: "100%" }}>
              <th>Informations</th>
              {(() => {
                if (minMagisk != (null || undefined)) {
                  return (
                    <tr>
                      <td
                        style={{
                          width: "100%",
                        }}
                      >
                        Min. Magisk
                      </td>
                      <td
                        style={{
                          color: os.isAndroid
                            ? BuildConfig.MAGISK.PARSE_VERSION(minMagisk) > BuildConfig.MAGISK.VERSION_CODE
                              ? "red"
                              : ""
                            : "",
                        }}
                      >
                        {minMagisk}
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })()}
              {(() => {
                if (minApi != (null || undefined)) {
                  return (
                    <tr>
                      <td style={{ width: "100%" }}>Min. Android</td>
                      <td>{minApi}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })()}
              {(() => {
                if (maxApi != (null || undefined)) {
                  return (
                    <tr>
                      <td style={{ width: "100%" }}>Max. Android</td>
                      <td>{maxApi}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })()}
              {(() => {
                if (needRamdisk != (null || undefined)) {
                  return (
                    <tr>
                      <td style={{ width: "100%" }}>needsRamdisk</td>
                      <td>{needRamdisk}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })()}
              {(() => {
                if (changeBoot != (null || undefined)) {
                  return (
                    <tr>
                      <td style={{ width: "100%" }}>changeBoot</td>
                      <td>{changeBoot}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })()}
            </table>
          </div>
        </Dialog>
      </>
    );
  };
}

export default ViewModuleActivity;
