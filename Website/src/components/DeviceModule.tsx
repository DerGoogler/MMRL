import { Card, Ripple, Switch } from "react-onsenui";
import Properties from "@js.properties/properties";
import File from "@Native/File";
import {Log} from "@Native/Log";
import { DeleteRounded, RefreshRounded } from "@mui/icons-material";
import React from "react";
import { useDarkmode } from "@Hooks/useDarkmode";
import { useStrings } from "@Hooks/useStrings";

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

const DeviceModule = (props: Props) => {
  const { strings } = useStrings();
  const [moduleProps, setModuleProps] = React.useState<any>({});
  const [dialogShown, setDialogShown] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(true);
  const [isSwitchDisabled, setIsSwitchDisabled] = React.useState(false);

  const isDarkmode = useDarkmode();
  const iconColor: string = isDarkmode ? "#bb86fc" : "#4a148c";

  const log = new Log("DeviceModule");

  const module = props.module;
  React.useEffect(() => {
    const readProps = File.read(`/data/adb/modules/${module}/module.prop`);
    setModuleProps(Properties.parseToProperties(readProps));

    const disable = new File(`/data/adb/modules/${module}/disable`);
    if (disable.exist()) {
      setIsEnabled(false);
    }

    const remove = new File(`/data/adb/modules/${module}/remove`);
    if (remove.exist()) {
      setIsSwitchDisabled(true);
    }
  }, [isEnabled, isSwitchDisabled]);

  const { id, name, version, versionCode, author, description } = moduleProps;

  return (
    <>
      <div>
        <Card id={id} key={id} style={{ marginTop: "4px", marginBottom: "4px", padding: 0 }}>
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
                            log.i(
                              strings.formatString(strings.module_enabled_LOG, {
                                name: module,
                              })
                            );
                          }
                        }
                      } else {
                        if (!disable.exist()) {
                          if (disable.create()) {
                            log.i(
                              strings.formatString(strings.module_disabled_LOG, {
                                name: module,
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
                  style={{ color: iconColor }}
                  onClick={() => {
                    // Can be improved, but not now
                    if (isSwitchDisabled) {
                      const remove = new File(`/data/adb/modules/${module}/remove`);
                      if (remove.exist()) {
                        if (remove.delete()) {
                          setIsSwitchDisabled(false);
                          log.i(`${module} has been recovered`);
                        } else {
                          log.e(`Failed to restore ${module}`);
                        }
                      } else {
                        log.e(`This remove file don't exists for ${module}`);
                      }
                    } else {
                      const file = new File(`/data/adb/modules/${module}/remove`);
                      if (file.create()) {
                        setIsSwitchDisabled(true);
                      } else {
                        setIsSwitchDisabled(false);
                      }
                    }
                  }}
                >
                  <Ripple />
                  {isSwitchDisabled ? (
                    <>
                      {strings.restore}
                      <RefreshRounded sx={{ color: iconColor }} />
                    </>
                  ) : (
                    <>
                      {strings.remove}
                      <DeleteRounded sx={{ color: iconColor }} />
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

export default DeviceModule;
