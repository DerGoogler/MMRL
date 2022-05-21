import * as React from "react";
import { Page, Toolbar, ToolbarButton, BackButton, Button, Toast } from "react-onsenui";
import MDIcon from "../components/MDIcon";
import HorizontalScroll from "react-scroll-horizontal";
import { Chip } from "@mui/material";
import ons from "onsenui";
import axios from "axios";
import Markdown from "markdown-to-jsx";

class ViewModuleActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: "",
      toastShown: false,
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
        <div className="center">{this.props.extra.name}</div>
      </Toolbar>
    );
  };

  render = () => {
    const { minMagisk, minApi, maxApi, needsRamdisk, changeBoot } = this.props.extra.moduleProps;
    return (
      <>
        <Page renderToolbar={this.renderToolbar}>
          <div style={{ padding: "8px", marginBottom: "56px" }} className="markdown-body-light">
            {(() => {
              // Don't show up if nothing ot these exists
              if ((minMagisk || minApi || maxApi || needsRamdisk || changeBoot) != (null || undefined)) {
                return (
                  <table style={{ width: "100%"}}>
                    {(() => {
                      if (minMagisk != (null || undefined)) {
                        return (
                          <tr>
                            <td style={{ width: "100%"}}>Min. Magisk</td>
                            <td>{minMagisk}</td>
                          </tr>
                        );
                      }
                    })()}
                    {(() => {
                      if (minApi != (null || undefined)) {
                        return (
                          <tr>
                            <td style={{ width: "100%"}}>Min. Android</td>
                            <td>{minApi}</td>
                          </tr>
                        );
                      }
                    })()}
                    {(() => {
                      if (maxApi != (null || undefined)) {
                        return (
                          <tr>
                            <td style={{ width: "100%"}}>Max. Android</td>
                            <td>{maxApi}</td>
                          </tr>
                        );
                      }
                    })()}
                    {(() => {
                      if (needsRamdisk != (null || undefined)) {
                        return (
                          <tr>
                            <td style={{ width: "100%"}}>needsRamdisk</td>
                            <td>{needsRamdisk}</td>
                          </tr>
                        );
                      }
                    })()}
                    {(() => {
                      if (changeBoot != (null || undefined)) {
                        return (
                          <tr>
                            <td style={{ width: "100%"}}>changeBoot</td>
                            <td>{changeBoot}</td>
                          </tr>
                        );
                      }
                    })()}
                  </table>
                );
              }
            })()}

            <Markdown>{this.state.notes}</Markdown>
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
              style={{ zIndex: 999999999 }}
              modifier="large"
              onClick={() => {
                ons.notification.alert("The option will be available in the future");
              }}
            >
              Install
            </Button>
          </div>
        </Page>
      </>
    );
  };
}

export default ViewModuleActivity;
