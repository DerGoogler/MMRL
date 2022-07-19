import { Component } from "react";
import DeviceModule from "@Components/DeviceModule";
import { PushProps } from "@Activitys/MainActivity";
import File from "@Native/File";

interface Props {
  pushPage(...arg: any): PushProps;
}

interface States {
  modules: any;
}

class DeviceModuleFragment extends Component<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      modules: [],
    };
  }

  public componentDidMount = () => {
    this.setState({ modules: File.list("/data/adb/modules").split(",") });
  };

  public render = () => {
    const moduels = this.state.modules.map((item: any) => {
      return <DeviceModule module={item} />;
    });
    return (
      <>
        <div
          style={{
            paddingBottom: "4px",
          }}
        >
          {moduels}
        </div>
      </>
    );
  };
}

export default DeviceModuleFragment;
