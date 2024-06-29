import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import React from "react";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ModuleFragment from "./fragments/ModuleFragment";
import DeviceModule from "@Components/module/DeviceModule";
import ExploreModule from "@Components/module/ExploreModule";
import UpdateModule from "@Components/module/UpdateModule";
import { ModuleViewActivity } from "./ModuleViewActivity";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { useActivity } from "@Hooks/useActivity";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { os } from "@Native/Os";
import { Page } from "@Components/onsenui/Page";
import { useStrings } from "@Hooks/useStrings";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import { useRepos } from "@Hooks/useRepos";
import SearchIcon from "@mui/icons-material/Search";
import Fab from "@Components/onsenui/Fab";
import { useLocalModules } from "@Hooks/useLocalModules";
import { Shell } from "@Native/Shell";
import { useSettings } from "@Hooks/useSettings";
import { useOpenModuleSearch } from "@Hooks/useOpenModuleSearch";
import InstallTerminalV2Activity from "./InstallTerminalV2Activity";
import { Chooser } from "@Native/Chooser";
import { useConfirm } from "material-ui-confirm";

const MainApplication = () => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { settings } = useSettings();
  const { modules } = useRepos();
  const [index, setIndex] = React.useState(0);
  const localModules = useLocalModules();
  const confirm = useConfirm();

  const handleOpenModuleSearch = useOpenModuleSearch(modules);

  const handleBackEvent = React.useCallback(
    (e: any) => {
      if (index === 0) {
        confirm({
          title: strings("exit_app"),
          description: strings("exit_app_desc"),
          confirmationText: strings("yes"),
          cancellationText: strings("no"),
        })
          .then(() => {
            if (typeof e.callParentHandler === "function") {
              e.callParentHandler();
            } else {
              navigator.app.exitApp();
            }
          })
          .catch(() => {});
      } else {
        setIndex(0);
      }
    },
    [index]
  );

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("module");
    const m_ = modules.find((m) => m.id === id);
    if (m_) {
      context.pushPage({
        component: ModuleViewActivity,
        key: "ModuleViewActivity",
        extra: m_,
      });
    }
  }, [modules]);

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: (
          <ModuleFragment id="explore" modules={modules} renderItem={(module, key) => <ExploreModule key={key} module={module} />} />
        ),
        tab: <Tabbar.Tab label={strings("explore")} />,
      },
      ...(os.isAndroid
        ? [
            {
              content: (
                <ModuleFragment
                  disableNoInternet
                  id="local"
                  modules={localModules}
                  renderItem={(module, key) => <DeviceModule key={key} module={module} />}
                  renderFixed={() => {
                    if (os.isAndroid && (Shell.isMagiskSU() || Shell.isKernelSU() || Shell.isAPatchSU())) {
                      return (
                        <Fab
                          sx={{
                            "& .fab__icon": {
                              verticalAlign: "middle",
                              color: "black",
                            },
                          }}
                          onClick={() => {
                            const chooseModule = new Chooser("application/zip");

                            chooseModule.onChose = (files) => {
                              if (Chooser.isSuccess(files)) {
                                context.pushPage({
                                  component: InstallTerminalV2Activity,
                                  key: "InstallTerminalV2Activity",
                                  extra: {
                                    exploreInstall: false,
                                    modSource: files,
                                  },
                                });
                              }
                            };

                            chooseModule.getFiles();
                          }}
                          position="bottom right"
                        >
                          <CreateNewFolderIcon />
                        </Fab>
                      );
                    }
                  }}
                />
              ),
              tab: <Tabbar.Tab label={strings("installed")} />,
            },
            {
              content: (
                <ModuleFragment
                  id="update"
                  modules={localModules}
                  renderItem={(module, key) => <UpdateModule key={key} module={module} />}
                />
              ),
              tab: <Tabbar.Tab label={strings("updates")} />,
            },
          ]
        : []),
    ];
  };

  const renderToolbar = () => {
    return (
      <Toolbar modifier="noshadow" sx={{ boderBottom: "unset !important" }}>
        <Toolbar.Left>
          <Toolbar.Button icon={MenuIcon} onClick={context.splitter.show} />
        </Toolbar.Left>
        <Toolbar.Center
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Typography
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
          </Typography>
        </Toolbar.Center>
        <Toolbar.Right>
          <Toolbar.Button icon={SearchIcon} onClick={() => handleOpenModuleSearch()} />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" onDeviceBackButton={handleBackEvent} renderToolbar={renderToolbar}>
      <Tabbar
        modifier="noshadow"
        hideTabs={!os.isAndroid}
        swipeable={settings.swipeable_tabs}
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
