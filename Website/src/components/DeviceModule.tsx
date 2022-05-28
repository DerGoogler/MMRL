import * as React from "react";
import { Card, Dialog, List, ListItem, Ripple, Switch, SwitchChangeEvent } from "react-onsenui";
import Properties from "@js.properties/properties";
import SuFile from "@Builders/SuFile";
import AlertBuilder from "@Builders/AlertBuilder";
import DeleteIcon from "./icons/DeleteIcon";
import Log from "@Builders/Log";
import Toast from "@Builders/Toast";
import Gesture from "./Gesture";
import TimeIcon from "./icons/TimeIcon";

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

class DeviceModule extends React.Component<Props, States> {
  private log: Log;
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
    const readProps = new SuFile(`/data/adb/modules/${module}/module.prop`).system.read();
    this.setState({
      props: Properties.parseToProperties(readProps),
    });

    const disable = new SuFile(`/data/adb/modules/${module}/disable`);
    if (disable.system.exists()) {
      this.setState({ isEnabled: false });
    }

    const remove = new SuFile(`/data/adb/modules/${module}/remove`);
    if (remove.system.exists()) {
      this.setState({ isSwitchDisabled: true });
    }
  };

  private showDialog = () => {
    this.setState({ dialogShown: true });
  };

  private hideDialog = () => {
    this.setState({ dialogShown: false });
  };

  public render = () => {
    const module = this.props.module;
    const { id, name, version, versionCode, author, description } = this.state.props;
    const { isEnabled, isSwitchDisabled } = this.state;
    return (
      <>
        <div>
            {/*
        // @ts-ignore */}
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
                          const disable = new SuFile(`/data/adb/modules/${module}/disable`);

                          if (checked) {
                            if (disable.system.exists()) {
                              if (disable.system.delete()) {
                                this.log.i(`${module} has been enabled`);
                              }
                            }
                          } else {
                            if (!disable.system.exists()) {
                              if (disable.system.createNewFile()) {
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
                    {version} / {author}
                  </item-version-author>
                  <item-description>{description}</item-description>
                  <item-module-button-wrapper>
                    <item-module-button
                      onClick={() => {
                        // Can be improved, but not now
                        if (isSwitchDisabled) {
                          const remove = new SuFile(`/data/adb/modules/${module}/remove`);
                          if (remove.system.exists()) {
                            if (remove.system.delete()) {
                              this.setState({ isSwitchDisabled: false });
                              this.log.i(`${module} has been recovered`);
                            } else {
                              this.log.e(`Failed to restore ${module}`);
                            }
                          } else {
                            this.log.e(`This remove file don't exists for ${module}`);
                          }
                        } else {
                          const file = new SuFile(`/data/adb/modules/${module}/remove`);
                          if (file.system.createNewFile()) {
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
                          <TimeIcon /> Restore
                        </>
                      ) : (
                        <>
                          <DeleteIcon /> Remove
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
