import DeviceModule from "@Components/module/DeviceModule";
import ExploreModule from "@Components/module/ExploreModule";
import UpdateModule from "@Components/module/UpdateModule";
import { useModuleQueue } from "@Components/ModulesQueue";
import Fab from "@Components/onsenui/Fab";
import { Page } from "@Components/onsenui/Page";
import { Tabbar, TabbarRenderTab } from "@Components/onsenui/Tabbar";
import { Toolbar } from "@Components/onsenui/Toolbar";
import { useActivity } from "@Hooks/useActivity";
import { useLocalModules } from "@Hooks/useLocalModules";
import { useRepos } from "@Hooks/useRepos";
import { useSettings } from "@Hooks/useSettings";
import { useStrings } from "@Hooks/useStrings";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Typography from "@mui/material/Typography";
import { Chooser } from "@Native/Chooser";
import { Log } from "@Native/Log";
import { os } from "@Native/Os";
import { Shell } from "@Native/Shell";
import { SuFile } from "@Native/SuFile";
import { SuZip } from "@Native/SuZip";
import { useConfirm } from "material-ui-confirm";
import { Properties } from "properties-file";
import React from "react";
import { Activities } from ".";
import ModuleFragment from "./fragments/ModuleFragment";

const TAG = "MainApplication";

const MainApplication = () => {
  const { context } = useActivity();
  const { strings } = useStrings();
  const { modules } = useRepos();
  const [index, setIndex] = React.useState(0);
  const localModules = useLocalModules();
  const confirm = useConfirm();

  const [swipeableTabs] = useSettings("swipeable_tabs");

  const handleBackEvent = React.useCallback(
    (e: any) => {
      if (index === 0) {
        if (typeof e.callParentHandler === "function") {
          e.callParentHandler();
        }
      } else {
        setIndex(0);
      }
    },
    [index]
  );

  React.useEffect(() => {
    const sharedFile = SuFile.getSharedFile();
    if (sharedFile) {
      const file = new SuFile(sharedFile);

      if (file.exist()) {
        const zipFile = new SuZip(file.getPath(), "module.prop");
        const props = new Properties(zipFile.read()).toObject();

        if (!props.id) {
          return;
        }

        confirm({
          title: strings("install_module", { name: props.name }),
          description: strings("install_module_dialog_desc", { name: <strong>{props.name}</strong> }),
          confirmationText: strings("yes"),
        })
          .then(() => {
            context.pushPage({
              component: Activities.InstallTerminal,
              key: "InstallTerminalV2Activity",
              extra: {
                exploreInstall: false,
                modSource: [file.getPath()],
              },
            });
          })
          .catch(() => {});
      } else {
        Log.i(TAG, "Unable to find shared file");
      }
    }
  }, []);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("module");
    const m_ = modules.find((m) => m.id === id);
    if (m_) {
      context.pushPage({
        component: Activities.ModuleView,
        key: "ModuleViewActivity",
        extra: m_,
      });
    }
  }, [modules]);

  const { toggleQueueView } = useModuleQueue();

  const renderTabs = (): TabbarRenderTab[] => {
    return [
      {
        content: (
          <ModuleFragment
            id="explore"
            modules={modules}
            searchBy={["id", "name", "author", "__mmrl_repo_source"]}
            renderItem={(module, key) => <ExploreModule key={key} module={module} />}
            renderFixed={() => {
              return (
                <Fab
                  sx={{
                    "& .fab__icon": {
                      verticalAlign: "middle",
                      color: "black",
                    },
                  }}
                  onClick={toggleQueueView}
                  position="bottom right"
                >
                  <LayersIcon />
                </Fab>
              );
            }}
          />
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
                            chooseModule.allowMultiChoose = true;
                            chooseModule.onChose = (files) => {
                              if (Chooser.isSuccess(files)) {
                                context.pushPage({
                                  component: Activities.InstallTerminal,
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
          <Toolbar.Button
            icon={VolunteerActivismIcon}
            onClick={() => {
              os.openURL("https://github.com/sponsors/DerGoogler", "_blank");
            }}
          />
        </Toolbar.Right>
      </Toolbar>
    );
  };

  return (
    <Page modifier="noshadow" onDeviceBackButton={handleBackEvent} renderToolbar={renderToolbar}>
      <Tabbar
        modifier="noshadow"
        hideTabs={!os.isAndroid}
        swipeable={swipeableTabs}
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
