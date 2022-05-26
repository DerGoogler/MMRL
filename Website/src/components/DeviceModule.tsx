import * as React from "react";
import { Card } from "react-onsenui";
import Properties from "@js.properties/properties";
import Shell from "@Builders/ShellBuilder";

interface Props {
  module: string;
}

interface States {
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
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      props: {},
    };
  }

  private grep(prop: string): string {
    const module = this.props.module;
    const readProp = Shell.cmd(`cat /data/adb/modules/${module}/module.prop | sed -n "s|^${prop}=||p"`).result();
    return readProp;
  }

  public render = () => {
    return (
      <>
        <div>
          {/*
        // @ts-ignore */}
          <Card
            id={"id"}
            key={"id"}
            //@ts-ignore
            style={{ marginTop: "4px", marginBottom: "4px" }}
          >
            <item-card-wrapper>
              <item-title className="title">
                <item-module-name>name</item-module-name>
              </item-title>
              <div className="content">
                <item-version-author>version / author</item-version-author>
                <item-description>description</item-description>
              </div>
            </item-card-wrapper>
          </Card>
        </div>
      </>
    );
  };
}

export default DeviceModule;
