import Toolbar from "@Builders/ToolbarBuilder";
import { SettingsRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import Toast from "@Native/Toast";
import { string } from "@Strings";
import { Tab, Tabbar, TabbarRenderTab, ToolbarButton } from "react-onsenui";
import AppCompatActivity from "./AppCompatActivity";
import DeviceModuleFragment from "./fragments/DeviceModuleFragment";
import ExploreModuleFragment from "./fragments/ExploreModuleFragment";
import SettingsActivity from "./SettingsActivity";

interface Props {
  id: string;
  name: string;
  version: string;
  versionCode: int;
  author: string;
  description: string;
  minApi?: int;
  maxApi?: int;
  minMagisk?: int;
  needRamdisk?: boolean;
  support?: string;
  donate?: string;
  config?: string;
  changeBoot?: boolean;
  pushPage: any;
}

class MainApplication extends AppCompatActivity<Props> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {};
  }

  public onCreateToolbar(): Toolbar.Props {
    return {
      title: "Magisk Module Repo Loader",
      addToolbarButtonPosition: "right",
      addToolbarButton: (
        <ToolbarButton className="back-button--material__icon" onClick={this.openSettings}>
          <SettingsRounded />
        </ToolbarButton>
      ),
    };
  }

  public componentDidMount() {
    super.componentDidMount;
  }

  public componentDidUpdate() {
    super.componentDidUpdate;
  }

  private openSettings = () => {
    this.props.pushPage({
      key: "settings",
      activity: SettingsActivity,
    });
  };

  private renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <ExploreModuleFragment pushPage={this.props.pushPage} />,
        tab: <Tab label={string.explore} />,
      },
      {
        content: <DeviceModuleFragment pushPage={this.props.pushPage} />,
        tab: <Tab label={string.installed} />,
      },
    ];
  };

  public onCreate = () => {
    return (
      <>
        {os.isAndroid ? (
          <Tabbar
            swipeable={false}
            position={SharedPreferences.getBoolean("enableBottomTabs_switch", false) ? "bottom" : "top"}
            renderTabs={this.renderTabs}
          />
        ) : (
          <ExploreModuleFragment pushPage={this.props.pushPage} />
        )}
      </>
    );
  };
}

export default MainApplication;
