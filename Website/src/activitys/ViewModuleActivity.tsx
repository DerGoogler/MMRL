import { Toolbar as gae, Button, AlertDialog } from "react-onsenuix";
import { Dialog } from "react-onsenui";
import ons from "onsenui";
import axios from "axios";
import { DownloadRounded, InfoRounded, InstallMobileRounded, VerifiedRounded } from "@mui/icons-material";
import { HighlightedMarkdown } from "@Components/HighlightMarkdown";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import Alert from "@mui/material/Alert";
import AppCompatActivity from "./AppCompatActivity";
import { string } from "@Strings";
import Magisk from "@Native/Magisk";
import Toolbar from "@Builders/ToolbarBuilder";
import { CSSProperties } from "react";
import { link, util } from "googlers-tools";
import ModuleProps from "@Types/ModuleProps";

interface Props {
  extra: {
    moduleProps: ModuleProps.PropUrl;
    [x: string]: any;
  };
  popPage: any;
}

interface States {
  notes: string;
  dialogShown: boolean;
  mProps: ModuleProps.PropUrl;
  mFoxProps: ModuleProps.FoxProps;
}

class ViewModuleActivity extends AppCompatActivity<Props, States> {
  public static readonly ignoreURL: bool = true;
  public pageStyle: CSSProperties = { marginBottom: "28px" };

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      notes: "",
      dialogShown: false,
      mProps: this.props.extra.moduleProps,
      mFoxProps: this.props.extra.moduleProps.foxprops,
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
            notes: `# 404: Not Found\n\n The author doesn't have created or uploaded an \`README.md\`, please try again later.\n\n\n## About Readme's\n\n- <dangermark/> readme.md\n- <checkmark/> README.md`,
          });
        }
      })
      .then(() => {
        // always executed
      });

    const { minMagisk, minApi, maxApi, needRamdisk, changeBoot } = this.state.mFoxProps;
    if (minApi && minApi > 20) {
      const builder = new AlertDialog.Builder();
      builder.setTitle("Unsupported!");
      builder.setMessage("This module target api is higher than your device api.");
      builder.setPositiveButton("Ok");
      builder.setCancelable(false);
      builder.showAlert();
    }
  };

  public onCreateToolbar = (): Toolbar.Props => {
    // Normal props
    const { name } = this.state.mProps;
    // FoxProps
    const { minMagisk, minApi, maxApi, needRamdisk, changeBoot } = this.state.mFoxProps;
    return {
      title: this.props.extra?.name,
      onBackButton: this.props.popPage,
      addToolbarButton: (
        <>
          {((minMagisk && minMagisk) ||
            (minApi && minApi) ||
            (maxApi && maxApi) ||
            (needRamdisk && needRamdisk) ||
            (changeBoot && changeBoot)) != (null || undefined) ? (
            <div className="right">
              <gae.Button style={{ padding: "0px 10px" }} className="back-button--material__icon" onClick={this.showDialog}>
                <InfoRounded />
              </gae.Button>
            </div>
          ) : null}
        </>
      ),
      addToolbarButtonPosition: "right",
    };
  };

  private showDialog = () => {
    this.setState({ dialogShown: true });
  };

  private hideDialog = () => {
    this.setState({ dialogShown: false });
  };

  public onCreate = () => {
    // Normal props
    const { name } = this.state.mProps;
    // FoxProps
    const { minMagisk, minApi, maxApi, needRamdisk, changeBoot } = this.state.mFoxProps;
    const { download, id } = this.props.extra;
    const { verified, low } = this.props.extra?.moduleOptions;
    return (
      <>
        <div
          style={{ padding: "8px", height: "100%" }}
          className={new SharedPreferences().getBoolean("enableDarkmode_switch", false) ? "markdown-body-dark" : "markdown-body-light"}
        >
          {verified && (
            <Alert key="verified-module" icon={<VerifiedRounded fontSize="inherit" />} severity="success">
              {string.module_verified}
            </Alert>
          )}
          <HighlightedMarkdown style={{ marginBottom: "8px", height: "100%" }} children={this.state.notes} />
        </div>
        <div style={{ height: "56px", width: "100%" }}></div>
        <div
          style={{
            position: "fixed",
            display: "flex",
            height: "52px",
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
          <Button
            modifier="large"
            onClick={() => {
              os.open(download);

              // Toast.makeText(`Download ${id!}`, Toast.LENGTH_LONG).show();
              // fs.download(`${id!}.zip`, download);
            }}
          >
            {string.download} <DownloadRounded sx={{ color: "white" }} />
          </Button>
          <div style={{ padding: "4px", display: !os.isAndroid ? "none" : "" }}></div>
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
              {minMagisk != (null || undefined) && (
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
                      color: os.isAndroid ? (Magisk.PARSE_VERSION(minMagisk as any) > Magisk.VERSION_CODE ? "red" : "") : "",
                    }}
                  >
                    {minMagisk}
                  </td>
                </tr>
              )}
              {minApi != (null || undefined) && (
                <tr>
                  <td style={{ width: "100%" }}>Min. Android</td>
                  <td>{minApi}</td>
                </tr>
              )}
              {maxApi != (null || undefined) && (
                <tr>
                  <td style={{ width: "100%" }}>Max. Android</td>
                  <td>{maxApi}</td>
                </tr>
              )}
              {needRamdisk != (null || undefined) && (
                <tr>
                  <td style={{ width: "100%" }}>needsRamdisk</td>
                  <td>{needRamdisk}</td>
                </tr>
              )}
              {changeBoot != (null || undefined) && (
                <tr>
                  <td style={{ width: "100%" }}>changeBoot</td>
                  <td>{changeBoot}</td>
                </tr>
              )}
            </table>
          </div>
        </Dialog>
      </>
    );
  };
}

export default ViewModuleActivity;
