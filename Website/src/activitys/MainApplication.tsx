import Toolbar from "@Builders/ToolbarBuilder";
import { TabWrapper } from "@Components/TabWrapper";
import { ExtensionRounded, SettingsRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import { string } from "@Strings";
import { Tab, Tabbar, TabbarRenderTab, ToolbarButton } from "react-onsenui";
import { ActivityXRenderData, Fab } from "react-onsenuix";
import AppCompatActivity from "./AppCompatActivity";
import DeviceModuleFragment from "./fragments/DeviceModuleFragment";
import ExploreModuleFragment from "./fragments/ExploreModuleFragment";
import RepoActivity from "./RepoActivity";
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

interface States {}

class MainApplication extends AppCompatActivity<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {};

    this.openSettings = this.openSettings.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.onCreateFAB = this.onCreateFAB.bind(this);
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

  public onBackButton(): void {
    os.close();
  }

  public onCreateFAB(): JSX.Element {
    return (
      <>
        <Fab
          style={{ borderRadius: "30%" }}
          modifier="material3"
          onClick={() => {
            this.props.pushPage({
              key: "repoactivity",
              activity: RepoActivity,
            });
          }}
          position="bottom right"
        >
          <span
            style={{
              verticalAlign: "middle",
            }}
          >
            <ExtensionRounded sx={{ verticalAlign: "baseline" }} />
          </span>
        </Fab>
      </>
    );
  }

  public componentDidUpdate() {
    super.componentDidUpdate;
  }

  private openSettings() {
    this.props.pushPage({
      key: "settings",
      activity: SettingsActivity,
    });
  }

  private renderTabs(): TabbarRenderTab[] {
    return [
      {
        content: <TabWrapper element={<ExploreModuleFragment pushPage={this.props.pushPage} />} />,
        tab: <Tab label={string.explore} />,
      },
      {
        content: <TabWrapper element={<DeviceModuleFragment pushPage={this.props.pushPage} />} />,
        tab: <Tab label={string.installed} />,
      },
    ];
  }

  public onCreate(data: ActivityXRenderData<Props, {}>) {
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
  }
}

export default MainApplication;
