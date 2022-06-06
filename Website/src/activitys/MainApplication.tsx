import { SettingsRounded } from "@mui/icons-material";
import ons from "onsenui";
import { Tab, Tabbar, Toolbar, ToolbarButton } from "react-onsenui";
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

  protected onCreateToolbar = () => {
    return (
      // @ts-ignore
      <Toolbar>
        <div
          className="center"
          onClick={() => {
            ons.notification.toast("My gf left me ... :(");
          }}
        >
          Magisk Module Repo Loader
        </div>
        <div className="right">
          {/*
          // @ts-ignore */}
          <ToolbarButton className="back-button--material__icon" onClick={this.openSettings}>
            <SettingsRounded />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  };

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

  private renderTabs = () => {
    return [
      {
        content: <ExploreModuleFragment pushPage={this.props.pushPage} />,
        tab: <Tab label="Explore" />,
      },
      {
        content: <DeviceModuleFragment pushPage={this.props.pushPage} />,
        tab: <Tab label="Installed" />,
      },
    ];
  };

  protected onCreate = () => {
    if (this.isAndroid) {
      //@ts-ignore
      return <Tabbar swipeable={false} position="auto" renderTabs={this.renderTabs} />;
    } else {
      return <ExploreModuleFragment pushPage={this.props.pushPage} />;
    }
  };
}

export default MainApplication;
