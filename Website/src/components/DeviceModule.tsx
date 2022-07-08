import { Component } from "react";
import { Card, Ripple, Switch } from "react-onsenui";
import Properties from "@js.properties/properties";
import fs from "@Native/fs";
import Log from "@Native/Log";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import SharedPreferences from "@Native/SharedPreferences";

interface Props {
  module: string;
}

interface States {
  dialogShown: boolean;
  isEnabled: boolean;
  isSwitchDisabled: boolean;
  props: {
    id?: string;
    name?: string;
    version?: string;
    versionCode?: int;
    author?: string;
    description?: string;
    minApi?: int;
    maxApi?: int;
    minMagisk?: int;
    needRamdisk?: boolean;
    support?: string;
    donate?: string;
    config?: string;
    changeBoot?: boolean;
  };
}

class DeviceModule extends Component<Props, States> {
  private log: Log;
  private iconColor: string = SharedPreferences.getBoolean("enableDarkmode_switch", false) ? "#bb86fc" : "#4a148c";

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      props: {},
      dialogShown: false,
      isEnabled: true,
      isSwitchDisabled: false,
    };
    this.log = new Log(this.constructor.name);
  }

  public componentDidMount = () => {
    const module = this.props.module;
    const readProps = fs.readFile(`/data/adb/modules/${module}/module.prop`);
    this.setState({
      props: Properties.parseToProperties(readProps),
    });

    const disable = new fs(`/data/adb/modules/${module}/disable`);
    if (disable.existFile()) {
      this.setState({ isEnabled: false });
    }

    const remove = new fs(`/data/adb/modules/${module}/remove`);
    if (remove.existFile()) {
      this.setState({ isSwitchDisabled: true });
    }
  };

  public render = () => {
    const module = this.props.module;
    const { id, name, version, versionCode, author, description } = this.state.props;
    const { isEnabled, isSwitchDisabled } = this.state;
    return (
      <>
        <div>
          <Card
            id={id}
            key={id}
            //@ts-ignore
            style={{ marginTop: "4px", marginBottom: "4px" }}
          >
            <item-card-wrapper>
              <item-title className="title">
                <item-module-name>
                  <item-name>{name}</item-name>
                  <item-switch>
                    <Switch
                      checked={isEnabled}
                      disabled={isSwitchDisabled}
                      onChange={(e: any) => {
                        const checked = e.target.checked;
                        const disable = new fs(`/data/adb/modules/${module}/disable`);

                        if (checked) {
                          if (disable.existFile()) {
                            if (disable.deleteFile()) {
                              this.log.i(`${module} has been enabled`);
                            }
                          }
                        } else {
                          if (!disable.existFile()) {
                            if (disable.createFile()) {
                              this.log.i(`${module} has been disabled`);
                            }
                          }
                        }
                      }}
                    />
                  </item-switch>{" "}
                </item-module-name>
              </item-title>
              <div className="content">
                <item-version-author>
                  {version} ({versionCode}) / {author}
                </item-version-author>
                <item-description>{description}</item-description>
                <item-module-button-wrapper>
                  <item-module-button
                    style={{ color: this.iconColor }}
                    onClick={() => {
                      // Can be improved, but not now
                      if (isSwitchDisabled) {
                        const remove = new fs(`/data/adb/modules/${module}/remove`);
                        if (remove.existFile()) {
                          if (remove.deleteFile()) {
                            this.setState({ isSwitchDisabled: false });
                            this.log.i(`${module} has been recovered`);
                          } else {
                            this.log.e(`Failed to restore ${module}`);
                          }
                        } else {
                          this.log.e(`This remove file don't exists for ${module}`);
                        }
                      } else {
                        const file = new fs(`/data/adb/modules/${module}/remove`);
                        if (file.createFile()) {
                          this.setState({ isSwitchDisabled: true });
                        } else {
                          this.setState({ isSwitchDisabled: false });
                        }
                      }
                    }}
                  >
                    <Ripple />
                    {isSwitchDisabled ? (
                      <>
                        Restore <RefreshRounded sx={{ color: this.iconColor }} />
                      </>
                    ) : (
                      <>
                        Remove <DeleteRounded sx={{ color: this.iconColor }} />
                      </>
                    )}
                  </item-module-button>
                </item-module-button-wrapper>
              </div>
            </item-card-wrapper>
          </Card>
        </div>
      </>
    );
  };
}

export default DeviceModule;
