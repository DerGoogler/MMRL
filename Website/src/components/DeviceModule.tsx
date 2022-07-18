import { Card, Ripple, Switch } from "react-onsenui";
import Properties from "@js.properties/properties";
import File from "@Native/File";
import Log from "@Native/Log";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import SharedPreferences from "@Native/SharedPreferences";
import { string } from "@Strings";
import { ViewX, ViewXRenderData } from "react-onsenuix";

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

class DeviceModule extends ViewX<Props, States> {
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
    const readProps = File.read(`/data/adb/modules/${module}/module.prop`);
    this.setState({
      props: Properties.parseToProperties(readProps),
    });

    const disable = new File(`/data/adb/modules/${module}/disable`);
    if (disable.exist()) {
      this.setState({ isEnabled: false });
    }

    const remove = new File(`/data/adb/modules/${module}/remove`);
    if (remove.exist()) {
      this.setState({ isSwitchDisabled: true });
    }
  };

  public createView(data: ViewXRenderData<Props, States, HTMLElement>): JSX.Element {
    const module = data.p.module;
    const { id, name, version, versionCode, author, description } = data.s.props;
    const { isEnabled, isSwitchDisabled } = data.s;
    return (
      <>
        <div>
          <Card
            id={id}
            key={id}
            style={{ marginTop: "4px", marginBottom: "4px" }}
          >
            <item-card-wrapper>
              <item-title className="title">
                <item-module-name>
                  <item-name>{name}</item-name>
                  <item-switch>
                    <Switch
                      modifier="material3"
                      checked={isEnabled}
                      disabled={isSwitchDisabled}
                      onChange={(e: any) => {
                        const checked = e.target.checked;
                        const disable = new File(`/data/adb/modules/${module}/disable`);

                        if (checked) {
                          if (disable.exist()) {
                            if (disable.delete()) {
                              this.log.i(
                                string.formatString(string.module_enabled_LOG, {
                                  module: module,
                                })
                              );
                            }
                          }
                        } else {
                          if (!disable.exist()) {
                            if (disable.create()) {
                              this.log.i(
                                string.formatString(string.module_disabled_LOG, {
                                  module: module,
                                })
                              );
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
                        const remove = new File(`/data/adb/modules/${module}/remove`);
                        if (remove.exist()) {
                          if (remove.delete()) {
                            this.setState({ isSwitchDisabled: false });
                            this.log.i(`${module} has been recovered`);
                          } else {
                            this.log.e(`Failed to restore ${module}`);
                          }
                        } else {
                          this.log.e(`This remove file don't exists for ${module}`);
                        }
                      } else {
                        const file = new File(`/data/adb/modules/${module}/remove`);
                        if (file.create()) {
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
                        {string.restore} <RefreshRounded sx={{ color: this.iconColor }} />
                      </>
                    ) : (
                      <>
                        {string.remove} <DeleteRounded sx={{ color: this.iconColor }} />
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
  }
}

export default DeviceModule;
