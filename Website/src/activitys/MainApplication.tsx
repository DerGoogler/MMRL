import { TabWrapper } from "@Components/TabWrapper";
import { ExtensionRounded, SettingsRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import { string } from "@Strings";
import { OnsFabElement } from "onsenui";
import { ToolbarButton } from "react-onsenui";
import { ActivityXRenderData, Fab, TabbarEvent, Tab, Tabbar, TabbarRenderTab } from "react-onsenuix";
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

interface States {
  fabDisplay: string;
}

class MainApplication extends AppCompatActivity<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      fabDisplay: "",
    };

    this.openSettings = this.openSettings.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.onCreateFAB = this.onCreateFAB.bind(this);

    document.querySelector<OnsFabElement>("ons-fab")?.hide();
  }

  public onCreateToolbar() {
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
          style={{ borderRadius: "30%", display: this.state.fabDisplay }}
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
            onPreChange={(event: TabbarEvent) => {
              if (event.index == 1) {
                this.setState({ fabDisplay: "none" });
              } else {
                this.setState({ fabDisplay: "" });
              }
            }}
          />
        ) : (
          <ExploreModuleFragment pushPage={this.props.pushPage} />
        )}
      </>
    );
  }
}

export default MainApplication;
