import * as React from "react";
import DeviceModule from "@Components/DeviceModule";
import { PushProps } from "@Activitys/MainActivity";
import { Page } from "react-onsenui";
import fs from "@Native/fs";

interface Props {
  pushPage(...arg: any): PushProps;
}

interface States {
  modules: any;
}

class DeviceModuleFragment extends React.Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      modules: [],
    };
  }

  public componentDidMount = () => {
    this.setState({ modules: fs.listFiles("/data/adb/modules").split(",") });
  };

  public render = () => {
    const moduels = this.state.modules.map((item: any) => {
      return <DeviceModule module={item} />;
    });
    return (
      <Page>
        <div
          style={{
            paddingBottom: "4px",
          }}
        >
          {moduels}
        </div>
      </Page>
    );
  };
}

export default DeviceModuleFragment;
