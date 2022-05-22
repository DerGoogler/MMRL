import * as React from "react";
import { Page, Toolbar, ToolbarButton, BackButton, Button, Dialog } from "react-onsenui";
import MDIcon from "../components/MDIcon";
import ons from "onsenui";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import Alert from "react-bootstrap/Alert";
import VerifiedIcon from "../components/icons/VerfifiedIcon";
import WarningIcon from "../components/icons/WarningIcon";
import Changelog from "../components/Changelog";

class ViewModuleActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      dialogShown: false,
    };
  }

  componentDidMount = () => {
    axios
      .get(this.props.extra.notes)
      .then((response) => {
        this.setState({
          notes: response.data,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.setState({
            notes: `# 404: Not Found\n\n The author doesn't have created or uploaded an \`README.md\`, please try again later.`,
          });
        }
      })
      .then(() => {
        // always executed
      });
  };

  renderToolbar = () => {
    const { minMagisk, minApi, maxApi, needsRamdisk, changeBoot } = this.props.extra.moduleProps;
    return (
      <Toolbar>
        <div className="left">
          <BackButton
            // @ts-ignore
            onClick={() => {
              this.props.popPage();
            }}
          />
        </div>
        {(() => {
          // Don't show up if nothing ot these exists
          if ((minMagisk || minApi || maxApi || needsRamdisk || changeBoot) != (null || undefined)) {
            return (
              <div className="right">
                <ToolbarButton style={{ padding: "0px 10px" }} onClick={this.showDialog}>
                  <MDIcon icon="info" isInToolbar={true} theme="white" size="24" />
                </ToolbarButton>
              </div>
            );
          }
        })()}
        <div className="center">{this.props.extra.name}</div>
      </Toolbar>
    );
  };

  showDialog = () => {
    this.setState({ dialogShown: true });
  };

  hideDialog = () => {
    this.setState({ dialogShown: false });
  };

  render = () => {
    const { minMagisk, minApi, maxApi, needsRamdisk, changeBoot, name, stars } = this.props.extra.moduleProps;
    const { verified, low } = this.props.extra.moduleOptions;
    return (
      <>
        <Page renderToolbar={this.renderToolbar}>
          <div style={{ padding: "8px", marginBottom: "56px" }} className="markdown-body-light">
            {(() => {
              if (verified) {
                return (
                  <Alert key="verified-module" variant="success">
                    <strong>
                      <VerifiedIcon color="#0f5132" />
                    </strong>{" "}
                    This module has been verified!
                  </Alert>
                );
              }
            })()}
            {(() => {
              if (low) {
                return (
                  <Alert key="low-module" variant="warning">
                    <strong>
                      <WarningIcon color="#664d03" />
                    </strong>{" "}
                    This is an low-quality module!
                  </Alert>
                );
              }
            })()}
            <Markdown
              options={{
                overrides: {
                  changelog: {
                    component: Changelog,
                  },
                },
              }}
            >
              {this.state.notes}
            </Markdown>
          </div>
          <div
            style={{
              position: "fixed",
              display: "flex",
              left: 0,
              padding: "8px",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              backgroundColor: "rgba(256, 256, 256, .85)",
            }}
          >
            <Button
              modifier="large"
              onClick={() => {
                window.open(this.props.extra.download, "_parent");
              }}
            >
              Download
            </Button>
            <div style={{ padding: "4px" }}></div>
            <Button
              modifier="large"
              disabled
              onClick={() => {
                ons.notification.alert("The option will be available in the future");
              }}
            >
              Install
            </Button>
          </div>
          <Dialog visible={this.state.dialogShown} cancelable={true} onDialogCancel={this.hideDialog}>
            <div style={{ margin: "20px" }} className="markdown-body-light">
              <table style={{ width: "100%" }}>
                <th>Informations</th>
                {(() => {
                  if (minMagisk != (null || undefined)) {
                    return (
                      <tr>
                        <td style={{ width: "100%" }}>Min. Magisk</td>
                        <td>{minMagisk}</td>
                      </tr>
                    );
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
                  }
                })()}
                {(() => {
                  if (needsRamdisk != (null || undefined)) {
                    return (
                      <tr>
                        <td style={{ width: "100%" }}>needsRamdisk</td>
                        <td>{needsRamdisk}</td>
                      </tr>
                    );
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
                  }
                })()}
              </table>
            </div>
          </Dialog>
        </Page>
      </>
    );
  };
}

export default ViewModuleActivity;
