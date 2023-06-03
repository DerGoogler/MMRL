import { Component } from "react";
import DeviceModule from "@Components/DeviceModule";
import File from "@Native/File";
import { PushPropsCore } from "@Hooks/useActivity";

interface Props {
  pushPage(...arg: any): PushPropsCore;
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
