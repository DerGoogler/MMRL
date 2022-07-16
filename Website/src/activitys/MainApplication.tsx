import Toolbar from "@Builders/ToolbarBuilder";
import { TabWrapper } from "@Components/TabWrapper";
import { SettingsRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import SharedPreferences from "@Native/SharedPreferences";
import Toast from "@Native/Toast";
import { string } from "@Strings";
import { createRef, RefObject } from "react";
import { Tab, Tabbar, TabbarRenderTab, ToolbarButton } from "react-onsenui";
import { ActivityXRenderData, Page } from "react-onsenuix";
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

interface States {
  isHeaderTitleVisible: boolean;
  isHeaderBGVisible: boolean;
}

class MainApplication extends AppCompatActivity<Props, States> {
  private headerTitleRef: RefObject<HTMLSpanElement>;
  private headerTtileObserver: IntersectionObserver;
  private headerBgObserver: IntersectionObserver;
  private headerBgRef: RefObject<HTMLDivElement>;

  public constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = {
      isHeaderTitleVisible: false,
      isHeaderBGVisible: false,
    };

    this.openSettings = this.openSettings.bind(this);
    this.renderTabs = this.renderTabs.bind(this);

    this.headerTitleRef = createRef();
    this.headerBgRef = createRef();

    this.headerTtileObserver = new IntersectionObserver(([entry]) => {
      this.setState({ isHeaderTitleVisible: entry.isIntersecting });
    });
    this.headerBgObserver = new IntersectionObserver(([entry]) => {
      this.setState({ isHeaderBGVisible: entry.isIntersecting });
    });
  }

  public onCreateToolbar(): Toolbar.Props {
    return {
      title: !this.state.isHeaderTitleVisible ? "Magisk Module Repo Loader" : "",
      modifier: this.state.isHeaderBGVisible ? "noshadow" : "",
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
    this.headerTtileObserver.observe(this.headerTitleRef.current as any);
    this.headerBgObserver.observe(this.headerBgRef.current as any);
  }

  public componentWillUnmount() {
    this.headerTtileObserver.disconnect();
    this.headerBgObserver.disconnect();
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
          <>
            <div
              ref={this.headerBgRef}
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
              <span ref={this.headerTitleRef}>Magisk Module Repo Loader</span>
            </div>
            <ExploreModuleFragment pushPage={this.props.pushPage} />
          </>
        )}
      </>
    );
  }
}

export default MainApplication;
