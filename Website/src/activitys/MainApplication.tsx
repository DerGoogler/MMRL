import { TabWrapper } from "@Components/TabWrapper";
import { Menu } from "@mui/icons-material";
import DeviceModuleFragment from "./fragments/DeviceModuleFragment";
import ExploreModuleFragment from "./fragments/ExploreModuleFragment";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { StyledSection } from "@Components/StyledSection";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";

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

const MainApplication = (props: Props) => {
  const { strings } = useStrings();
  // const { scheme, theme } = useTheme();

  const { context } = useActivity();

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <TabWrapper element={ExploreModuleFragment} props={{ pushPage: props.pushPage }} />,
        tab: <Tabbar.Tab label={strings.explore} />,
      },
      {
        content: <TabWrapper element={DeviceModuleFragment} props={{ pushPage: props.pushPage }} />,
        tab: <Tabbar.Tab label={strings.installed} />,
      },
    ];
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow">
        <Toolbar.Left>
          <Toolbar.Button
            icon={Menu}
            onClick={() => {
              context.splitter.show();
            }}
          />
        </Toolbar.Left>
        <Toolbar.Center>MMRL</Toolbar.Center>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      {os.isAndroid ? (
        <>
          <Tabbar modifier="noshadow" swipeable={false} position={"top"} renderTabs={renderTabs} />
        </>
      ) : (
        <StyledSection>
          <ExploreModuleFragment />
        </StyledSection>
      )}
    </Page>
  );
};

export default MainApplication;
