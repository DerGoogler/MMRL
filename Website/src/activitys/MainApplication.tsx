import { Menu } from "@mui/icons-material";
import DeviceModuleFragment from "./fragments/DeviceModuleFragment";
import ExploreModuleFragment from "./fragments/ExploreModuleFragment";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import { useRepos } from "@Hooks/useRepos";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useNativeStorage } from "@Hooks/useNativeStorage";
import { BuildConfig } from "@Native/BuildConfig";
import { useNewerVersion } from "@Hooks/useNewerVersion";
import FetchTextActivity from "./FetchTextActivity";

const MainApplication = () => {
  const { strings } = useStrings();
  const { context } = useActivity();
  const [index, setIndex] = React.useState(0);

  const filteredModules = (modules: Module[], search: string) =>
    modules.filter(
      (module) =>
        module.id.toLowerCase().includes(search.toLowerCase()) ||
        module.name.toLowerCase().includes(search.toLowerCase()) ||
        module.author?.toLowerCase().includes(search.toLowerCase()) ||
        module.description?.toLowerCase().includes(search.toLowerCase())
    );

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: <ExploreModuleFragment applyFilter={filteredModules} />,
        tab: <Tabbar.Tab label={strings("explore")} />,
      },
      ...(os.isAndroid
        ? [
            {
              content: <DeviceModuleFragment />,
              tab: <Tabbar.Tab label={strings("installed")} />,
            },
          ]
        : []),
    ];
  };

  const [currentVersion, setCurrentVersion] = useNativeStorage<VersionType>("current_version", "0.0.0");
  const isNewVersion = useNewerVersion(currentVersion, BuildConfig.VERSION_NAME);

  React.useEffect(() => {
    if (isNewVersion) {
      setCurrentVersion(BuildConfig.VERSION_NAME);
      context.pushPage({
        component: FetchTextActivity,
        key: "changelog",
        extra: {
          url: "https://raw.githubusercontent.com/wiki/DerGoogler/MMRL/Changelog.md",
          title: "Changelog",
        },
      });
    }
  }, []);

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
        <Toolbar.Center
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <CodeRoundedIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MMRL
          </Typography>
        </Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button>
            <Avatar sx={{ width: 35.4, height: 35.4 }} alt="Account">
              A
            </Avatar>
          </Toolbar.Button>
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" renderToolbar={renderToolbar}>
      <Tabbar
        modifier="noshadow"
        hideTabs={!os.isAndroid}
        swipeable={false}
        position={"top"}
        index={index}
        onPreChange={(event) => {
          if (event.index != index) {
            setIndex(event.index);
          }
        }}
        renderTabs={renderTabs}
      />
    </Page>
  );
};

export default MainApplication;
