import Icon from "@Components/Icon";
import { TabWrapper } from "@Components/TabWrapper";
import { SettingsRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import { string } from "@Strings";
import { Disappear } from "react-disappear";
import { Tab, Tabbar, TabbarRenderTab, ToolbarButton } from "react-onsenui";
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
  toolbarShadow: string;
  toolbarTitle: string;
}

class MainApplication extends AppCompatActivity<Props, States> {
  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      toolbarShadow: "noshadow",
      toolbarTitle: "",
    };

    this.openSettings = this.openSettings.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.onCreateFAB = this.onCreateFAB.bind(this);
  }

  public onCreateToolbar() {
    return {
      modifier: this.state.toolbarShadow,
      title: this.state.toolbarTitle,
      addToolbarButtonPosition: "right",
      addToolbarButton: (
        <ToolbarButton className="back-button--material__icon" onClick={this.openSettings}>
          <Icon icon={SettingsRounded} keepLight={true} />
        </ToolbarButton>
      ),
    };
  }

  public onBackButton(): void {
    os.close();
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
        content: <TabWrapper element={ExploreModuleFragment} props={{ pushPage: this.props.pushPage }} />,
        tab: <Tab label={string.explore} />,
      },
      {
        content: <TabWrapper element={DeviceModuleFragment} props={{ pushPage: this.props.pushPage }} />,
        tab: <Tab label={string.installed} />,
      },
    ];
  }

  public onCreate() {
    return (
      <>
        {os.isAndroid ? (
          <Tabbar
            swipeable={false}
            position={SharedPreferences.getBoolean("enableBottomTabs_switch", false) ? "bottom" : "top"}
            renderTabs={this.renderTabs}
          />
        ) : (
          <>
            <Disappear
              onDisappear={(visible) => {
                this.setState({ toolbarShadow: visible ? "noshadow" : "" });
              }}
            >
              <div
                style={{
                  padding: "50px",
                  paddingTop: "6px",
                  textAlign: "center",
                  backgroundColor: SharedPreferences.getBoolean("enableDarkmode_switch", false) ? "rgb(31, 31, 31)" : "#4a148c",
                  color: "white",
                  fontSize: "30px",
                  boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 5px",
                }}
              >
                <Disappear
                  onDisappear={(visible) => {
                    this.setState({ toolbarTitle: visible ? "" : "Magisk Module Repo Loader" });
                  }}
                >
                  <span>Magisk Module Repo Loader</span>
                </Disappear>
              </div>
            </Disappear>
            <ExploreModuleFragment pushPage={this.props.pushPage} />
          </>
        )}
      </>
    );
  }
}

export default MainApplication;
