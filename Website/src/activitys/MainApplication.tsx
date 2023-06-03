import Icon from "@Components/Icon";
import { TabWrapper } from "@Components/TabWrapper";
import { SettingsRounded } from "@mui/icons-material";
import { os } from "@Native/os";
import Constants from "@Utils/Constants";
import { Carousel, Fab, Page, Tab, Tabbar, TabbarRenderTab, ToolbarButton } from "react-onsenui";
import DeviceModuleFragment from "./fragments/DeviceModuleFragment";
import ExploreModuleFragment from "./fragments/ExploreModuleFragment";
import SettingsActivity from "./SettingsActivity";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import React from "react";
import { useDarkmode } from "@Hooks/useDarkmode";
import { Disappear } from "react-disappear";
import Fade from "@mui/material/Fade";
import { useActivity } from "@Hooks/useActivity";
import { useRepos } from "@Hooks/useRepos";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useText } from "@Hooks/useLanguage";

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
  const string = useText();
  const scrollTop = React.useRef<HTMLDivElement>(null);
  const [toolbarShadow, setToolbarShadow] = React.useState("noshadow");
  const [toolbarTitle, setToolbarTitle] = React.useState("");
  const [titleShow, setTitleShow] = React.useState(true);

  const isDarkmode = useDarkmode();

  const { context } = useActivity();

  const openSettings = () => {
    context.pushPage({
      activity: SettingsActivity,
      props: {
        key: "settings",
      },
    });
  };

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <TabWrapper element={ExploreModuleFragment} props={{ pushPage: props.pushPage }} />,
        tab: <Tab label={string("explore")} />,
      },
      {
        content: <TabWrapper element={DeviceModuleFragment} props={{ pushPage: props.pushPage }} />,
        tab: <Tab label={string("installed")} />,
      },
    ];
  };

  const renderFixed = () => (
    <Fade in={titleShow}>
      <div>
        {/* @ts-ignore */}
        <Fab onClick={handleClick} position="bottom right">
          <Icon icon={ArrowUpwardIcon} keepLight />
        </Fab>
      </div>
    </Fade>
  );

  const handleClick = () => {
    scrollTop.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Page
      renderFixed={renderFixed}
      renderToolbar={() => {
        return (
          <>
            <ToolbarBuilder
              modifier={toolbarShadow}
              title={
                <Fade in={titleShow}>
                  <span>{os.isAndroid ? Constants.GlobalMMRLTitle : toolbarTitle}</span>
                </Fade>
              }
              addToolbarButtonPosition="right"
              addToolbarButton={
                <ToolbarButton className="back-button--material__icon" onClick={openSettings}>
                  <Icon icon={SettingsRounded} keepLight={true} />
                </ToolbarButton>
              }
            />
          </>
        );
      }}
    >
      <div ref={scrollTop}></div>
      {os.isAndroid ? (
        <>
          <div ref={scrollTop}></div>
          <Tabbar swipeable={false} position={isDarkmode ? "bottom" : "top"} renderTabs={renderTabs} />
        </>
      ) : (
        <>
          <Disappear
            style={{
              padding: "50px",
              paddingTop: "6px",
              textAlign: "center",
              backgroundColor: isDarkmode ? "rgb(31, 31, 31)" : "#4a148c",
              color: "white",
              fontSize: "30px",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 5px",
            }}
            wrapper="div"
            onDisappear={(visible) => {
              setToolbarShadow(visible ? "noshadow" : "");
            }}
          >
            <Disappear
              wrapper={"span"}
              onDisappear={(visible) => {
                setTitleShow(!visible);
                setToolbarTitle(visible ? "" : Constants.GlobalMMRLTitle);
              }}
            >
              {Constants.GlobalMMRLTitle}
            </Disappear>
          </Disappear>
          <ExploreModuleFragment />
        </>
      )}
    </Page>
  );
};

export default MainApplication;
